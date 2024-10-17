import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { NotFoundError } from 'rxjs';
import { UserDtoUpdate } from './user.dto-update';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
  }

  async createUser(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ username, email, password: hashPassword });

    const existingUserName = await this.userRepository.findOne({ where: { username } });
    if (existingUserName) {
      throw new ConflictException('ユーザー名が存在しています。');
    }

    const existingUserEmail = await this.userRepository.findOne({ where: { email } });
    if (existingUserEmail) {
      throw new ConflictException('emailが存在しています。');
    }

    return this.userRepository.save(newUser);
  }

  async loginUser(email: string, password: string): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('このユーザーは存在しません。');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('パスワードが違います。');
    }

    const payload = { email: user.email, username: user.username };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async logout(req, res) {
    req.session?.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'ログアウトに失敗しました。' });
      }
    });

    res.clearCookie('accessToken');
    return res.status(200).json({ message: 'ログアウト成功' });
  }

  async myProfile(id: number) {
    return this.findUser(id);
  }

  async userProfile(requestId: number, targetId: number) {
    const targetUser = await this.findUser(targetId);
    const requestUser = await this.findUser(requestId);
    if (targetUser.id == requestUser.id) {
      return requestUser;
    }
    if ((await requestUser)?.isAdmin) {
      return targetUser;
    }

    if (!(await targetUser).isProfilePublic) {
      throw new ForbiddenException('このプロフィールは非公開です。');
    }
    const { id, username } = (await targetUser);
    return { id, username };
  }

  async updateUser(userId: number, userDtoUpdate: UserDtoUpdate) {
    const user = await this.findUser(userId);
    Object.assign(user, userDtoUpdate);
    return this.userRepository.save(user);
  }

  async updateAdmin(requestId: number, targetId: number, userDtoUpdate: UserDtoUpdate) {
    const targetUser = await this.findUser(targetId);
    const requestUser = await this.findUser(requestId);
    if (requestUser.isAdmin) {
      Object.assign(targetUser, userDtoUpdate);
    }
    return this.userRepository.save(targetUser);
  }

  private async findUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('ユーザーが見つかりません。');
    }
    return user;
  }
}

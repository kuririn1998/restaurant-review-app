import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


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
}

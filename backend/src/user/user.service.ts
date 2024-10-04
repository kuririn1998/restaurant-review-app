import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
  }

  async createUser(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    if (username.length < 5 || username.length > 20) {
      throw new UnauthorizedException('ユーザー名の長さは 3-20 文字にする必要があります。');
    }
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      throw new UnauthorizedException('ユーザー名の形式が無効です');
    }

    if (password.length < 6 || password.length > 30) {
      throw new UnauthorizedException('パスワードの長さは 6-30 文字にする必要があります。');
    }
    const passwordRegex = /^[a-zA-Z0-9_]+$/;
    if (!passwordRegex.test(password)) {
      throw new UnauthorizedException('パスワードの形式が無効です');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new UnauthorizedException('Eメールの形式が無効です');
    }

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

  async loginUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('このユーザーは存在しません。');
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const isPasswordValid = await bcrypt.compare(hashPassword, user.password);
    if (isPasswordValid) {
      throw new UnauthorizedException('パスワードが違います。');
    }
    return user;
  }
}

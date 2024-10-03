import { Injectable, UnauthorizedException } from '@nestjs/common';
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
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({ username, email, password: hashPassword });
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

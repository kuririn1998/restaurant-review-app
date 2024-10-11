import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../src/user/user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../src/user/user.entity';
import { describe, expect, test, beforeEach, it } from '@jest/globals';

import * as bcrypt from 'bcrypt';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

describe('サービスのunitテスト', () => {
  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository, // モックとしてRepositoryを使用
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('createUser', () => {
    const username = 'testuser';
    const email = 'test@example.com';
    const password = 'password123';

    it('should create a user successfully', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(null); // ユーザーが存在しないと仮定
      jest.spyOn(userRepository, 'save').mockResolvedValue({ id: 1, username, email });

      const result = await userService.createUser(username, email, password);
      expect(result).toEqual({ id: 1, username, email });
      expect(userRepository.save).toHaveBeenCalled();
    });

    it('should throw an UnauthorizedException if username length is invalid', async () => {
      await expect(userService.createUser('ab', email, password)).rejects.toThrow(UnauthorizedException);
      await expect(userService.createUser('a', email, password)).rejects.toThrow(UnauthorizedException);
      await expect(userService.createUser('a'.repeat(21), email, password)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw an UnauthorizedException if password length is invalid', async () => {
      await expect(userService.createUser(username, email, 'pass')).rejects.toThrow(UnauthorizedException);
      await expect(userService.createUser(username, email, 'a'.repeat(31))).rejects.toThrow(UnauthorizedException);
    });

    it('should throw an UnauthorizedException if email format is invalid', async () => {
      await expect(userService.createUser(username, 'invalid-email', password)).rejects.toThrow(UnauthorizedException);
    });

    it('should throw a ConflictException if username already exists', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce({ id: 1, username });

      await expect(userService.createUser(username, email, password)).rejects.toThrow(ConflictException);
    });

    it('should throw a ConflictException if email already exists', async () => {
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce({ id: 1, email });

      await expect(userService.createUser(username, email, password)).rejects.toThrow(ConflictException);
    });
  });
});

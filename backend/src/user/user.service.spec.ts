import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { describe, expect, test, beforeEach, it, jest } from '@jest/globals';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;
  let repository: Repository<User>;

  const mockUserRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        }],
    }).compile();

    userService = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('createUser', () => {
    const id = 1;
    const username = 'testuser';
    const email = 'test@example.com';
    const password = 'password123';
    // it('should create a user successfully', async () => {
    //   jest.spyOn(repository, 'findOne').mockResolvedValue(null); // ユーザーが存在しないと仮定
    //   jest.spyOn(repository, 'save').mockResolvedValue({ id, username, email, password });
    //
    //   const result = await userService.createUser(username, email, password);
    //   expect(result).toEqual({ id: 1, username, email, password });
    //   expect(repository.save).toHaveBeenCalled();
    // });

    it('ユーザー名の長さが無効な場合は UnauthorizedException をスローされる', async () => {
      await expect(userService.createUser('', email, password)).rejects.toThrow(UnauthorizedException);
      await expect(userService.createUser('a', email, password)).rejects.toThrow(UnauthorizedException);
      await expect(userService.createUser('ab', email, password)).rejects.toThrow(UnauthorizedException);
      await expect(userService.createUser('a'.repeat(21), email, password)).rejects.toThrow(UnauthorizedException);
      await expect(userService.createUser('a'.repeat(22), email, password)).rejects.toThrow(UnauthorizedException);
      await expect(userService.createUser('ab cde', email, password)).rejects.toThrow(UnauthorizedException);
      await expect(userService.createUser('abcde', email, password));
      await expect(userService.createUser('a'.repeat(20), email, password));

    });

    it('パスワードの長さが無効な場合は UnauthorizedException をスローされる', async () => {
      await expect(userService.createUser(username, email, 'pass')).rejects.toThrow(UnauthorizedException);
      await expect(userService.createUser(username, email, 'a'.repeat(31))).rejects.toThrow(UnauthorizedException);

      await expect(userService.createUser(username, email, '123456'));
      await expect(userService.createUser(username, email, 'a'.repeat(30)));
    });


    it('ユーザー名がすでに存在している場合、ConflictExceptionがスローされる', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce({
        id: 1,
        username: 'testuser',
        email: 'email@test.com',
        password,
      });
      await expect(userService.createUser('testuser', 'email@example.com', password)).rejects.toThrow(ConflictException);
    });

    it('ユーザー名が不正の場合、UnauthorizedExceptionがスローされる', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce({
        id: 1,
        username: 'test user',
        email: 'email@test.com',
        password,
      });



      await expect(userService.createUser(username, email, password)).rejects.toThrow(UnauthorizedException);
    });

    it('emailがすでに存在している場合、ConflictExceptionがスローされる', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce({
        id: 1,
        username: 'testtest',
        email: 'test@example.com',
        password,
      });

      await expect(userService.createUser(username, email, password)).rejects.toThrow(ConflictException);
    });

    it('emailが不正の場合、UnauthorizedExceptionがスローされる', async () => {
      await expect(userService.createUser(username, 'invalid-email', password)).rejects.toThrow(UnauthorizedException);
    });
  });
});

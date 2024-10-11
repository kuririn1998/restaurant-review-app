import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { describe, expect, beforeEach, it, jest } from '@jest/globals';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

describe('UserService', () => {
  let userService: UserService;
  let repository: Repository<User>;
  let jwtService: JwtService;

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
        }, {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mockedJwtToken'),
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('createUser', () => {
    const id = 1;
    const username = 'testuser';
    const email = 'test@example.com';
    const password = 'password123';

    it('ユーザー名がすでに存在している場合、ConflictExceptionがスローされる', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce({
        id: 1,
        username: 'testuser',
        email: 'email@test.com',
        password,
      });
      await expect(userService.createUser('testuser', 'email@example.com', password)).rejects.toThrow(ConflictException);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { username: 'testuser' } });

    });

    it('emailがすでに存在している場合、ConflictExceptionがスローされる', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce({
        id: 1,
        username: 'testtest',
        email: email,
        password,
      });

      await expect(userService.createUser(username, email, password)).rejects.toThrow(ConflictException);
    });

  });
});

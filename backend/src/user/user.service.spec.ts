import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { describe, expect, beforeEach, it, jest } from '@jest/globals';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { afterEach } from 'node:test';

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

  afterEach(() => {
      jest.clearAllMocks();
    },
  );

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
        role: 'ordinary',
        isAdmin: false,
        isProfilePublic: false,
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
        role: 'ordinary',
        isAdmin: false,
        isProfilePublic: false,
      });

      await expect(userService.createUser(username, email, password)).rejects.toThrow(ConflictException);
    });

  });
  describe('profileの参照', () => {
    it('ユーザーが存在する場合、ユーザーを返却する', async () => {
      const user = {
        id: 1,
        username: 'testtest',
        email: 'test@test.com',
        password: 'testpassword',
        role: 'ordinary',
        isAdmin: false,
        isProfilePublic: false,
      };
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce({
        id: 1,
        username: 'testtest',
        email: 'test@test.com',
        password: 'testpassword',
        role: 'ordinary',
        isAdmin: false,
        isProfilePublic: false,
      });
      const result = await userService.myProfile(1);
      expect(result).toEqual(user);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('存在しないユーザーを参照した場合、NotFoundExceptionがスローされる', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce({
        id: 1,
        username: 'testtest',
        email: 'test@test.com',
        password: 'testpassword',
        role: 'ordinary',
        isAdmin: false,
        isProfilePublic: false,
      });
      const result = await userService.myProfile(2);
      // expect(result).toEqual(user);

      await expect(userService.findUser(1)).rejects.toThrow(NotFoundException);
    });

    it('userIdが不正の場合、Unauthorizedがスローされる', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValueOnce({
        id: 1,
        username: 'testtest',
        email: 'test@test.com',
        password: 'testpassword',
        role: 'ordinary',
        isAdmin: false,
        isProfilePublic: false,
      });
      await expect(userService.findUser(1)).rejects.toThrow(UnauthorizedException);
    });
  });
});

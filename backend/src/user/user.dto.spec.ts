import { validate } from 'class-validator';
import { UserDto } from './user.dto';
import { describe, expect, test, beforeEach, it } from '@jest/globals';

describe('UserDto', () => {
  let userDto: UserDto;

  beforeEach(() => {
    userDto = new UserDto();
  });

  it('ユーザー名が正しい場合、バリデーションエラーは発生しない', async () => {
    userDto.username = 'validuser';
    userDto.email = 'validemail@example.com';
    userDto.password = 'validpassword';

    const errors = await validate(userDto);
    expect(errors.length).toBe(0);
  });

  it('ユーザー名が短すぎる場合、バリデーションエラーが発生する', async () => {
    userDto.username = 'usr';
    userDto.email = 'validemail@example.com';
    userDto.password = 'validpassword';

    const errors = await validate(userDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toHaveProperty('length');
    expect(errors[0].constraints.isLength).toContain('ユーザー名の長さは 5-20 文字にする必要があります。');
  });

  it('ユーザー名が長すぎる場合、バリデーションエラーが発生する', async () => {
    userDto.username = 'a'.repeat(21);
    userDto.email = 'validemail@example.com';
    userDto.password = 'validpassword';

    const errors = await validate(userDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('username');
    expect(errors[0].constraints.isLength).toContain('ユーザー名の長さは 5-20 文字にする必要があります。');
  });

  it('ユーザー名に無効な文字が含まれている場合、バリデーションエラーが発生する', async () => {
    userDto.username = 'invalid user!';
    userDto.email = 'validemail@example.com';
    userDto.password = 'validpassword';

    const errors = await validate(userDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
    expect(errors[0].constraints.matches).toContain('ユーザー名の形式が無効です。');
  });

  it('Eメールの形式が無効な場合、バリデーションエラーが発生する', async () => {
    userDto.username = 'validuser';
    userDto.email = 'invalid-email';
    userDto.password = 'validpassword';

    const errors = await validate(userDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isEmail');
    expect(errors[0].constraints.isEmail).toContain('Eメールの形式が無効です。');
  });

  it('パスワードが短すぎる場合、バリデーションエラーが発生する', async () => {
    userDto.username = 'validuser';
    userDto.email = 'validemail@example.com';
    userDto.password = 'pass';

    const errors = await validate(userDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toHaveProperty('length');
    expect(errors[0].constraints.isLength).toContain('パスワードの長さは 6-30 文字でなければなりません。');
  });

  it('パスワードが長すぎる場合、バリデーションエラーが発生する', async () => {
    userDto.username = 'validuser';
    userDto.email = 'validemail@example.com';
    userDto.password = 'a'.repeat(31);

    const errors = await validate(userDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toHaveProperty('length');
    expect(errors[0].constraints.isLength).toContain('パスワードの長さは 6-30 文字でなければなりません。');
  });

  it('パスワードに無効な文字が含まれている場合、バリデーションエラーが発生する', async () => {
    userDto.username = 'validuser';
    userDto.email = 'validemail@example.com';
    userDto.password = 'invalid pass';

    const errors = await validate(userDto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('matches');
    expect(errors[0].constraints.matches).toContain('パスワードの形式が無効です。');
  });
});

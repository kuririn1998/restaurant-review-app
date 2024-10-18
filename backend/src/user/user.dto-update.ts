import { IsEmail, IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';

export class UserDtoUpdate {
  @IsOptional()
  @Length(5, 20, { message: 'ユーザー名の長さは 5-20 文字にする必要があります。' })
  @Matches(/^[a-zA-Z0-9_]+$/, { message: 'ユーザー名の形式が無効です。' })
  username: string;

  @IsOptional()
  @IsEmail({}, { message: 'Eメールの形式が無効です。' })
  email: string;

  @IsOptional()
  @Length(6, 30, { message: 'パスワードの長さは 6-30 文字でなければなりません。' })
  @Matches(/^[a-zA-Z0-9_]+$/, { message: 'パスワードの形式が無効です。' })
  password: string;

  @IsOptional()
  @Length(0, 200, { message: '自己紹介の長さは 200 文字まで可能です。' })
  description: string;
}


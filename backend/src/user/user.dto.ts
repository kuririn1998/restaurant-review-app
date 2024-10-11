import { IsEmail, IsNotEmpty, Length, Matches } from 'class-validator';

export class UserDto {
  @IsNotEmpty({ message: 'ユーザー名は必須です' })
  @Length(5, 20, { message: 'ユーザー名の長さは 5-20 文字にする必要があります。' })
  @Matches(/^[a-zA-Z0-9_]+$/, { message: 'ユーザー名の形式が無効です。' })
  username: string;

  @IsNotEmpty({ message: 'Eメールは必須です。' })
  @IsEmail({}, { message: 'Eメールの形式が無効です。' })
  email: string;

  @IsNotEmpty({ message: 'パスワードは必須です。' })
  @Length(6, 30, { message: 'パスワードの長さは 6-30 文字でなければなりません。' })
  @Matches(/^[a-zA-Z0-9_]+$/, { message: 'パスワードの形式が無効です。' })
  password: string;

}


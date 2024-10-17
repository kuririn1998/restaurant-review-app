import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsString, Length } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ['admin', 'ordinary', 'owner'], default: 'ordinary' })
  role: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: true })
  isProfilePublic: boolean;

}

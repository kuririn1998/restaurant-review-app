import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ default: '' })
  description: string;

}

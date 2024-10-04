import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    createUser(username: string, email: string, password: string): Promise<User>;
    loginUser(email: string, password: string): Promise<User>;
}

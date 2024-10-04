import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    registerUser(username: string, email: string, password: string): Promise<import("./user.entity").User>;
    loginUser(email: string, password: string): Promise<import("./user.entity").User>;
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async createUser(username, email, password) {
        if (username.length < 5 || username.length > 20) {
            throw new common_1.UnauthorizedException('ユーザー名の長さは 3-20 文字にする必要があります。');
        }
        const usernameRegex = /\s/;
        if (!usernameRegex.test(username)) {
            throw new common_1.UnauthorizedException('ユーザー名の形式が無効です');
        }
        if (password.length < 6 || password.length > 30) {
            throw new common_1.UnauthorizedException('パスワードの長さは 6-30 文字にする必要があります。');
        }
        const passwordRegex = /\s/;
        if (!passwordRegex.test(password)) {
            throw new common_1.UnauthorizedException('パスワードの形式が無効です');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new common_1.UnauthorizedException('Eメールの形式が無効です');
        }
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = this.userRepository.create({ username, email, password: hashPassword });
        const existingUserName = await this.userRepository.findOne({ where: { username } });
        if (existingUserName) {
            throw new common_1.ConflictException('ユーザー名が存在しています。');
        }
        const existingUserEmail = await this.userRepository.findOne({ where: { email } });
        if (existingUserEmail) {
            throw new common_1.ConflictException('emailが存在しています。');
        }
        return this.userRepository.save(newUser);
    }
    async loginUser(email, password) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException('このユーザーは存在しません。');
        }
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const isPasswordValid = await bcrypt_1.default.compare(hashPassword, user.password);
        if (isPasswordValid) {
            throw new common_1.UnauthorizedException('パスワードが違います。');
        }
        return user;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map
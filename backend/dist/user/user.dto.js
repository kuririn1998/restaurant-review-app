"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const zod_1 = require("zod");
exports.CreateUserDto = zod_1.z.object({
    username: zod_1.z
        .string()
        .min(5, { message: '正しく入力してください' })
        .max(20, { message: '正しく入力してください' }),
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
//# sourceMappingURL=user.dto.js.map
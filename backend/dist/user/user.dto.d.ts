import { z } from 'zod';
export declare const CreateUserDto: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username?: string;
    email?: string;
    password?: string;
}, {
    username?: string;
    email?: string;
    password?: string;
}>;
export type CreateUserDto = z.infer<typeof CreateUserDto>;

import { Controller, Post, Body, Req, Res, ValidationPipe, UsePipes, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { JwtGuard } from '../jwt/jwt.guard';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async registerUser(
    @Body() userDto: UserDto,
  ) {
    return this.userService.createUser(userDto.username, userDto.email, userDto.password);
  }

  @Post('login')
  async loginUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.userService.loginUser(email, password);
  }

  @Post('logout')
  async logoutUser(@Req() req: Request, @Res() res: Response) {
    return this.userService.logout(req, res);
  }

  @Get('user/:userId')
  @UseGuards(JwtGuard)
  async getProfile(@Param('userId') userId: number): Promise<UserDto> {
    return this.userService.myProfile(userId);
  }

  @Get('profile/:id')
  @UseGuards(JwtGuard)
  async getUserProfile(@Req() req, @Param('id') targetUserId: number) {
    return this.userService.userProfile(req.user.userId, targetUserId);
  }

}

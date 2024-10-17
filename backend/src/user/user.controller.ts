import { Controller, Post, Body, Req, Res, ValidationPipe, UsePipes, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import { JwtGuard } from '../jwt/jwt.guard';
import { UserDtoUpdate } from './user.dto-update';
import { JwtGuardRole } from '../jwt/jwt.guard-role';

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

  @Post('edit')
  @UseGuards(JwtGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateProfile(@Req() req, @Body() userDtoUpdate: UserDtoUpdate) {
    const userId = req.user.userId;
    return this.userService.updateUser(userId, userDtoUpdate);
  }

  @Post('edit/:id')
  @UseGuards(JwtGuard, JwtGuardRole)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async updateAdminProfile(@Req() req, @Param('id') targetId, @Body() userDtoUpdate: UserDtoUpdate) {
    const requestId = req.user.userId;
    return this.userService.updateAdmin(requestId, targetId, userDtoUpdate);
  }

}

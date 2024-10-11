import { Controller, Post, Body, Req, Res, ValidationPipe, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

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
}

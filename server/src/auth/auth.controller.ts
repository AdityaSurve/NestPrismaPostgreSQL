import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  signup() {
    return this.authService.signup();
  }
  @Post('login')
  login() {
    return this.authService.login();
  }
  @Get('signout')
  signout() {
    return this.authService.signout();
  }
}

import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {
    console.log('auth service');
  }
  async signup() {
    return { message: 'signup' };
  }
  async login() {
    return { message: 'login' };
  }
  async signout() {
    return { message: 'signout' };
  }
}

import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('register')
  async register(@Body('email') email: string): Promise<{ message: string }> {
    await this.authService.registerUser(email);
    return { message: 'Un e-mail de confirmation a été envoyé.' };
  }

  @Post('confirm')
  async confirmEmail(
    @Query('token') token: string,
  ): Promise<{ message: string }> {
    const isConfirmed = await this.authService.confirmEmail(token);
    if (!isConfirmed) {
      throw new BadRequestException('Lien de confirmation invalide ou expiré');
    }
    return { message: 'Email confirmé avec succès' };
  }
}

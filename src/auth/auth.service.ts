import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mail/mail.service';
import { UserService } from '../user/user.service';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    if (!user.isEmailConfirmed) {
      throw new UnauthorizedException(
        'Veuillez confirmer votre email avant de vous connecter',
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: password_, ...result } = user;
    return result;
  }

  async registerUser(email: string): Promise<void> {
    const token = uuidv4(); // Génère un token unique
    await this.usersService.updateUserByEmail(email, {});
    await this.mailService.sendConfirmationEmail(email, token);
  }

  async confirmEmail(token: string): Promise<boolean> {
    const user = await this.usersService.findByToken(token);
    if (user) {
      await this.usersService.updateUserById(user.id, {
        isEmailConfirmed: true,
        emailConfirmedAt: new Date(),
        confirmationToken: null,
      });
      return true;
    }
    return false;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

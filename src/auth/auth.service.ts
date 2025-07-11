import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async registerUser(email: string, password: string): Promise<void> {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Un utilisateur avec cet email existe déjà.');
    }

    const confirmationToken = uuidv4();
    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 24); // Expiration en 24h

    await this.usersService.createUser(
      email,
      password,
      confirmationToken,
      tokenExpiration,
    );

    await this.mailService.sendConfirmationEmail(email, confirmationToken);
  }

  async confirmEmail(token: string): Promise<boolean> {
    const user = await this.usersService.findByToken(token);
    if (!user) {
      throw new NotFoundException('Token invalide ou expiré.');
    }

    if (user.confirmationTokenExpires < new Date()) {
      throw new BadRequestException(
        'Le token a expiré, veuillez vous réinscrire.',
      );
    }

    await this.usersService.updateUserById(user.id, {
      isEmailConfirmed: true,
      emailConfirmedAt: new Date(),
      confirmationToken: null,
      confirmationTokenExpires: null,
    });
    return true;
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user.isEmailConfirmed) {
      throw new NotFoundException(
        'Utilisateur non trouvé ou email non confirmé.',
      );
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      throw new BadRequestException('Mot de passe incorrect.');
    }
    return user;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

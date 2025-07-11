import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  async createUser(
    @Body()
    body: {
      email: string;
      password: string;
      confiramtionToken: string;
      confirmationTokenExpires: Date;
    },
  ) {
    return this.userService.createUser(
      body.email,
      body.password,
      body.confiramtionToken,
      body.confirmationTokenExpires,
    );
  }
}

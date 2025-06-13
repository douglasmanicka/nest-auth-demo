import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupDto } from './dto/signup.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  signup(@Body() dto: SignupDto) {
    return this.usersService.signup(dto);
  }
}

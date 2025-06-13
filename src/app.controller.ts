import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { SignupDto } from './users/dto/signup.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

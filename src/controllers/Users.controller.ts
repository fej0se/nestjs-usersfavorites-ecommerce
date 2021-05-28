import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from '../services/Users.service';

@Controller('user')
export class UsersController {
  constructor(private UsersService: UsersService) {}

  @Post('/register')
  async create(@Body() user): Promise<any> {
    return this.UsersService.create(user);
  }

  @Post('/login')
  async login(@Body() user): Promise<any> {
    return this.UsersService.login(user);
  }
}

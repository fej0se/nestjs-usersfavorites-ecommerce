import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
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

  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  @Post('/logout')
  async logout(@Req() req): Promise<any> {
    return this.UsersService.logout(req);
  }
}

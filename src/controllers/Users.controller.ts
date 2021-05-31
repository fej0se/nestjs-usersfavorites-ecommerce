import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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

  @UseGuards(AuthGuard('jwt'))
  @Get('/testalogin')
  async test(@Req() req) {
    return this.UsersService.getUserId(req);
  }
}

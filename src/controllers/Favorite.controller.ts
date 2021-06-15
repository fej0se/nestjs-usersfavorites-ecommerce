import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FavoriteService } from 'src/services/Favorite.service';
import { UsersService } from 'src/services/Users.service';

@Controller('favs')
export class FavoritesController {
  constructor(
    private favService: FavoriteService,
    private userService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':product_id')
  async ehfavorite(@Param() Favorite, @Req() req) {
    Favorite.user_id = req.user.userId;
    const isLoggedIn = await this.userService.getStatus(req);
    if (isLoggedIn) {
      return this.favService.checkFavs(Favorite);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post(':product_id')
  async fav(@Param() Favorite, @Req() req) {
    Favorite.user_id = req.user.userId;

    const isLoggedIn = await this.userService.getStatus(req);
    if (isLoggedIn) {
      return this.favService.fav(Favorite);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':product_id')
  async unfav(@Param() Favorite, @Req() req) {
    Favorite.user_id = req.user.userId;
    const isLoggedIn = await this.userService.getStatus(req);
    if (isLoggedIn) {
      return this.favService.unfav(Favorite);
    }
  }
}

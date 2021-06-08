import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UnauthorizedException,
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
    Favorite.id_usuario = req.user.userId;
    const estaLogado = await this.userService.getStatus(req);
    if (estaLogado) {
      return this.favService.checaFavorito(Favorite);
    } else {
      throw new UnauthorizedException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post(':product_id')
  async fav(@Param() Favorite, @Req() req) {
    Favorite.id_usuario = req.user.userId;

    const estaLogado = await this.userService.getStatus(req);
    if (estaLogado) {
      return this.favService.fav(Favorite);
    } else {
      throw new UnauthorizedException();
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':product_id')
  async unfav(@Param() Favorite, @Req() req) {
    Favorite.id_usuario = req.user.userId;
    const estaLogado = await this.userService.getStatus(req);
    if (estaLogado) {
      return this.favService.unfav(Favorite);
    } else {
      throw new UnauthorizedException();
    }
  }
}

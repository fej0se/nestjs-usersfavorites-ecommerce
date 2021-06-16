import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Favorite } from 'src/models/Favorite.model';
import { ExternalAPIService } from './externalAPI.service';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(Favorite)
    private favoriteModel: typeof Favorite,
    private api: ExternalAPIService,
  ) {}

  async checkFav(favs: Favorite) {
    const { user_id, product_id } = favs;
    const favorite = await this.favoriteModel.findOne({
      where: { user_id, product_id },
    });
    if (favorite) {
      return favorite;
    } else {
      return false;
    }
  }

  async fav(favs: Favorite) {
    const check = await this.checkFav(favs);

    if (!check) {
      const produtos = await this.api.getProducts();
      const produtoValido = produtos.find((prod) => prod.id == favs.product_id);
      if (produtoValido) {
        await this.favoriteModel.create(favs);
        this.api.sendMail(favs.user_id);
        return { message: 'produto favoritado' };
      } else {
        return { message: 'produto não existe' };
      }
    } else {
      throw new InternalServerErrorException();
    }
  }

  async unfav(favs: Favorite) {
    const check = await this.checkFav(favs);

    if (check) {
      await check.destroy();
      this.api.sendMail(favs.user_id);
      return { message: 'produto desfavoritado' };
    } else {
      throw new NotFoundException();
    }
  }
}

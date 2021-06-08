import { Injectable, InternalServerErrorException } from '@nestjs/common';
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

  async checaFavorito(favs: Favorite) {
    const { id_usuario, product_id } = favs;
    const favorite = await this.favoriteModel.findOne({
      where: { id_usuario, product_id },
    });
    if (favorite) {
      return favorite;
    } else {
      return false;
    }
  }

  async fav(favs: Favorite) {
    const checa = await this.checaFavorito(favs);

    if (!checa) {
      const produtos = await this.api.getProducts();
      const produtoValido = produtos.find((prod) => prod.id == favs.product_id);
      if (produtoValido) {
        await this.favoriteModel.create(favs);
        this.api.sendMail(favs.id_usuario);
        return { message: 'produto favoritado' };
      } else {
        return { message: 'produto não existe' };
      }
    } else {
      return { message: 'produto já está favoritado' };
    }
  }

  async unfav(favs: Favorite) {
    const checa = await this.checaFavorito(favs);

    if (checa) {
      await checa.destroy();
      this.api.sendMail(favs.id_usuario);
      return { message: 'produto desfavoritado' };
    } else {
      throw new InternalServerErrorException();
    }
  }
}

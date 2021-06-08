import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { Favorite } from 'src/models/Favorite.model';
import { User } from 'src/models/User.model';

@Injectable()
export class ExternalAPIService {
  constructor(
    private http: HttpService,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Favorite)
    private favModel: typeof Favorite,
    @InjectSendGrid()
    private client: SendGridService,
  ) {}

  getProducts(): Promise<Array<any>> {
    return this.http
      .get(process.env.PRODUCTS_API_URL)
      .toPromise()
      .then((response) => response.data);
  }

  async sendMail(id) {
    const usuario = await this.userModel.findOne({
      where: {
        id,
      },
    });
    const nomeProdutosFavs = [];
    const produtos = await this.getProducts();
    const produtosFavoritos = await this.favModel.findAll({
      where: {
        id_usuario: id,
      },
    });
    produtosFavoritos.forEach((prod) => {
      for (let i = 0; i < produtos.length; i++) {
        if (prod.product_id == produtos[i].id) {
          nomeProdutosFavs.push(produtos[i].title);
        }
      }
    });

    function wait(usuario, nomeProdutosFavs, sendgrid) {
      const msg = {
        to: usuario.email,
        from: process.env.STORE_MAIL,
        subject: 'Seus produtos favoritos',
        text: nomeProdutosFavs.join(', '),
        html: nomeProdutosFavs.join(', '),
      };

      sendgrid
        .send(msg)
        .then(() => {
          console.log('Email sent');
        })
        .catch((error) => {
          console.error(error);
        });
    }

    setTimeout(wait, 120000, usuario, nomeProdutosFavs, this.client);
  }
}

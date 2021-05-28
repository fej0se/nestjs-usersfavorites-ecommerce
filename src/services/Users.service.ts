import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/User.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(user: User) {
    const { username, email } = user;
    try {
      const userExist = await this.userModel.findOne({
        where: {
          username,
          email,
        },
      });
      if (!userExist) {
        this.userModel.create(user);
        return { message: `usuário criado: ${user.username}` };
      } else {
        throw new Error('Usuário já existe');
      }
    } catch (err) {
      return { message: err.message };
    }
  }

  async login(user) {
    const { username, password } = user;
    const findUser = await this.userModel.findOne({
      where: {
        username,
      },
    });

    if (!findUser) {
      console.log('User not found');
    } else {
      const passwordMatch = bcrypt.compareSync(password, findUser.password);
      if (passwordMatch) {
        console.log('logado');
      } else {
        console.log('senha invalida');
      }
    }
  }
}

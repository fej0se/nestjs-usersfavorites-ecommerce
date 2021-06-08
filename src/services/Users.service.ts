import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/User.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async create(user: User) {
    const { username, email } = user;
    try {
      const userExist: User = await this.userModel.findOne({
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
      throw new UnauthorizedException();
    } else {
      const passwordMatch = bcrypt.compareSync(password, findUser.password);
      if (passwordMatch) {
        findUser.update({
          isLoggedIn: true,
        });

        const payload = {
          userId: findUser.id,
        };

        return {
          access_token: this.jwtService.sign(payload),
        };
      } else {
        throw new UnauthorizedException();
      }
    }
  }

  async logout(req): Promise<void> {
    const id = req.user.userId;
    const user: User = await this.userModel.findOne({
      where: {
        id,
      },
    });

    user.update({ isLoggedIn: false });
  }

  async getStatus(req): Promise<any> {
    const id = req.user.userId;
    const iat = req.user.iat;
    const user: User = await this.userModel.findOne({
      where: {
        id,
      },
    });
    const dbData = Math.floor(user.updatedAt.getTime() / 1000);
    if (dbData > iat) {
      return false;
    } else {
      return true;
    }
  }

  async getUserId(req): Promise<number> {
    const id = req.user.userId;
    const userCheck: User = await this.userModel.findOne({
      where: {
        id,
      },
    });

    return userCheck.id;
  }
}

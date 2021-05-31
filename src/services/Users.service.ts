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

  async getUserId(req): Promise<number> {
    const { userId } = req.user;
    const userCheck = await this.userModel.findOne({
      where: {
        id: userId,
      },
    });

    return userCheck.id;
  }
}

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './controllers/Users.controller';
import { User } from './models/User.model';
import { UsersService } from './services/Users.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: './src/database/data.sqlite',
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}

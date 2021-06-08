import { HttpModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './controllers/Users.controller';
import { User } from './models/User.model';
import { UsersService } from './services/Users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './auth/jwt.strategy';
import { FavoritesController } from './controllers/Favorite.controller';
import { FavoriteService } from './services/Favorite.service';
import { Favorite } from './models/Favorite.model';
import { ExternalAPIService } from './services/externalAPI.service';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: process.env.DATABASE_LOCATION,
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([User, Favorite]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: process.env.JWT_SECRET_KEY,
        signOptions: { expiresIn: process.env.JWT_EXPIRE_TIME },
      }),
      inject: [ConfigService],
    }),
    HttpModule,
    SendGridModule.forRoot({
      apiKey: process.env.APIKEY_SEND_GRID,
    }),
  ],
  controllers: [UsersController, FavoritesController],
  providers: [UsersService, FavoriteService, ExternalAPIService, JwtStrategy],
})
export class AppModule {}

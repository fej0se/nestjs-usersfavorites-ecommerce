import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '215d454dwq4d5qw4d5qwd45wd156wqd4',
    });
  }

  async validate(payload: { userId: number }) {
    return {
      userId: payload.userId,
    };
  }
}

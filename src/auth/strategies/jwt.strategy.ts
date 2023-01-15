import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { UsersService } from 'src/users/users.service';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        process.env.JWT_SECRET_KEY || 'MbldunEImm3H33wr3KQQCrX8HIQbUaHY',
    });
  }

  async validate(payload: { sub: string; email: string }) {
    const data = { id: payload.sub, email: payload.email };

    const user = await this.usersService.findByCond(data);

    if (!user) {
      throw new UnauthorizedException('У вас нет доступа к этой странице!');
    }

    return {
      id: user.id,
      email: user.email,
    };
  }
}

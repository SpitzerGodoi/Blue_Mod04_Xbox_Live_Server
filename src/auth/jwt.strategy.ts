import { PrismaService } from './../prisma/prisma.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: { nickname: string }) {
    const user = await this.prisma.user.findUnique({
      where: { nickname: payload.nickname },
    });
    if (!user) {
      throw new UnauthorizedException(
        'Usuario não existe ou não esta autenticado',
      );
    }
    delete user.password;

    return user;
  }
}

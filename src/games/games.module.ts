import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {
  constructor(private readonly gameService: GamesService) {}
}

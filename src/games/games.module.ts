import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';

@Module({
  imports: [PrismaModule],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {
  constructor(private readonly gameService: GamesService) {}
}

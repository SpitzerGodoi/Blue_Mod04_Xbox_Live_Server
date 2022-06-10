import { PrismaService } from 'src/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { FavoritosService } from './favoritos.service';
import { FavoritosController } from './favoritos.controller';

@Module({
  imports: [PrismaService],
  controllers: [FavoritosController],
  providers: [FavoritosService],
})
export class FavoritosModule {}

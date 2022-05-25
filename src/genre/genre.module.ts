import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';

@Module({
  imports: [PrismaModule],
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {
  constructor(private readonly genreService: GenreService) {}
}

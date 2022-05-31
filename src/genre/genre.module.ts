import { PrismaModule } from './../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PrismaModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [GenreController],
  providers: [GenreService],
})
export class GenreModule {
  constructor(private readonly genreService: GenreService) {}
}

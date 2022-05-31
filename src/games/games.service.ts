import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGamesDto } from './dto/create-games.dto';
import { UpdateGamesDto } from './dto/update-games.dto';
import { handleError } from 'src/utils/handle-error.util';
import { Game } from './entities/games.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.game.findMany({
      include: {
        genres: true,
      },
    });
  }
  async findById(id: string) {
    const record = await this.prisma.game.findUnique({
      where: {
        id: id,
      },
      include: {
        genres: true,
      },
    });
    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado`);
    }
    return record;
  }

  async findOne(id: string): Promise<Game> {
    return this.findById(id);
  }

  async create(createGameDto: CreateGamesDto) {
    const data: Prisma.GameCreateInput = {
      title: createGameDto.title,
      description: createGameDto.description,
      coverImageUrl: createGameDto.coverImageUrl,
      year: createGameDto.year,
      imdbScore: createGameDto.imdbScore,
      urlTrailerYT: createGameDto.urlTrailerYT,
      urlGameplayYT: createGameDto.urlGameplayYT,
      genres: {
        connect: {
          name: createGameDto.genreName,
        },
      },
    };
    return await this.prisma.game
      .create({
        data,
        include: {
          genres: true,
        },
      })
      .catch(handleError);
  }
  async update(id: string, dto: UpdateGamesDto) {
    const gameAtual = await this.findById(id);
    const data: Prisma.GameUpdateInput = {
      title: dto.title,
      description: dto.description,
      coverImageUrl: dto.coverImageUrl,
      year: dto.year,
      imdbScore: dto.imdbScore,
      urlTrailerYT: dto.urlTrailerYT,
      urlGameplayYT: dto.urlGameplayYT,
      genres: {
        disconnect: {
          name: gameAtual.genres[0].name,
        },
        connect: {
          name: dto.genreName,
        },
      },
    };
    return await this.prisma.game
      .update({
        where: { id },
        data,
        include: {
          genres: true,
        },
      })
      .catch(handleError);
  }
  async delete(id: string) {
    await this.findById(id);

    await this.prisma.game.delete({ where: { id } });
  }
}

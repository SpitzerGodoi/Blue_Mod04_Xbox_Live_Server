import { PrismaService } from '../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGamesDto } from './dto/create-games.dto';
import { UpdateGamesDto } from './dto/update-games.dto';
import { Game } from './entities/games.entity';

@Injectable()
export class GamesService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Game[]> {
    return this.prisma.game.findMany();
  }

  async findById(id: string): Promise<Game> {
    const record = await this.prisma.game.findUnique({ where: { id } });

    if (!record) {
      throw new NotFoundException(`Registro com o '${id}' não encontrado.`);
    }

    return record;
  }

  async findOne(id: string): Promise<Game> {
    return this.findById(id);
  }

  handleError(error: Error) {
    console.log(error.message);

    return undefined;
  }
  create(dto: CreateGamesDto): Promise<Game> {
    const data: Game = { ...dto };

    return this.prisma.game.create({ data }).catch(this.handleError);
  }
  async update(id: string, dto: UpdateGamesDto): Promise<Game> {
    await this.findById(id);

    const data: Partial<Game> = { ...dto };

    return this.prisma.game.update({
      where: { id },
      data,
    });
  }
  async delete(id: string) {
    await this.findById(id);

    await this.prisma.game.delete({ where: { id } });
  }
}

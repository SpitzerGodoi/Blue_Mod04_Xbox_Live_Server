import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { handleError } from 'src/utils/handle-error.util';
import { Genre } from './entities/genre.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Genre[]> {
    return this.prisma.genre.findMany();
  }

  async findById(name: string): Promise<Genre> {
    const record = await this.prisma.genre.findUnique({
      where: {
        name,
      },
    });
    if (!record) {
      throw new NotFoundException(`Registro com o ID '${name}' não encontrado`);
    }
    return record;
  }

  async findOne(id: string): Promise<Genre> {
    return this.findById(id);
  }

  async create(dto: CreateGenreDto, user: User): Promise<Genre> {
    if (user.isAdmin) {
      const genre: Genre = { ...dto };
      return await this.prisma.genre
        .create({
          data: genre,
        })
        .catch(handleError);
    } else {
      throw new UnauthorizedException(
        'Usuário não tem permissão. Caso isso esteja errado, contate o ADMIN!',
      );
    }
  }

  async update(name: string, dto: UpdateGenreDto, user: User): Promise<Genre> {
    if (user.isAdmin) {
      await this.findById(name);
      const data: Partial<Genre> = { ...dto };
      return this.prisma.genre
        .update({
          where: { name },
          data,
        })
        .catch(handleError);
    } else {
      throw new UnauthorizedException(
        'Usuário não tem permissão. Caso isso esteja errado, contate o ADMIN!',
      );
    }
  }

  async delete(name: string, user: User) {
    if (user.isAdmin) {
      await this.findById(name);
      await this.prisma.genre.delete({ where: { name } });
    } else {
      throw new UnauthorizedException(
        'Usuário não tem permissão. Caso isso esteja errado, contate o ADMIN!',
      );
    }
  }
}

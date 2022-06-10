import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { handleError } from 'src/utils/handle-error.util';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Profile[]> {
    return this.prisma.profile.findMany({
      include: {
        user: true,
        Favoritos: true,
      },
    });
  }

  async findById(id: string): Promise<Profile> {
    const record = await this.prisma.profile.findUnique({
      where: {
        id: id,
      },
      include: { Favoritos: true },
    });
    if (!record) {
      throw new NotFoundException(`Registro com o ID '${id}' não encontrado`);
    }
    return record;
  }

  async findOne(id: string): Promise<Profile> {
    return this.findById(id);
  }

  async create(userId: string, dto: CreateProfileDto): Promise<Profile> {
    if (dto.gameId) {
      return await this.prisma.profile
        .create({
          data: {
            name: dto.name,
            image: dto.image,
            userId: userId,
            Favoritos: {
              connect: {
                id: dto.gameId,
              },
            },
          },
          include: { Favoritos: true, user: true },
        })
        .catch(handleError);
    } else {
      return await this.prisma.profile
        .create({
          data: {
            name: dto.name,
            image: dto.image,
            userId: userId,
          },
          include: { Favoritos: true },
        })
        .catch(handleError);
    }
  }

  async update(userId: string, id: string, dto: UpdateProfileDto) {
    await this.findById(id);
    if (dto.gameId) {
      return this.prisma.profile
        .update({
          where: { id },
          data: {
            name: dto.name,
            image: dto.image,
            userId: userId,
            Favoritos: {
              connect: {
                id: dto.gameId,
              },
            },
          },
          include: { Favoritos: true },
        })
        .catch(handleError);
    } else {
      return this.prisma.profile
        .update({
          where: { id },
          data: {
            name: dto.name,
            image: dto.image,
            userId: userId,
          },
          include: { Favoritos: true },
        })
        .catch(handleError);
    }
  }
  async delete(id: string) {
    await this.findById(id);

    await this.prisma.profile.delete({ where: { id } });
  }
}

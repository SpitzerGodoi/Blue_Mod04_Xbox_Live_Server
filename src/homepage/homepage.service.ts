import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class HomepageService {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: string) {
    const profileData = await this.prisma.profile.findUnique({
      where: { id },
      select: {
        name: true,
        image: true,
        user: {
          select: {
            nickname: true,
            isAdmin: true,
          },
        },
        games: {
          select: {
            title: true,
            coverImageUrl: true,
            description: true,
            imdbScore: true,
            genres: {
              select: {
                name: true,
              },
            },
          },
        },
        favoritos: {
          select: {
            game: true,
          },
        },
      },
    });

    const allGenres = await this.prisma.genre.findMany({
      select: {
        name: true,
        games: {
          select: {
            title: true,
            coverImageUrl: true,
          },
        },
      },
    });

    return {
      profileData,
      allGenres,
    };
  }
}

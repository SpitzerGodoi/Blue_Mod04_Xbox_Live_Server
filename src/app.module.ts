import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GenreModule } from './genre/genre.module';
import { GamesModule } from './games/games.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { FavoritosModule } from './favoritos/favoritos.module';
import { HomepageModule } from './homepage/homepage.module';

@Module({
  imports: [
    GamesModule,
    GenreModule,
    PrismaModule,
    UserModule,
    ProfileModule,
    AuthModule,
    FavoritosModule,
    HomepageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

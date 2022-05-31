import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateGamesDto {
  @IsString()
  @ApiProperty({
    description: 'O nome de um jogo',
    example: 'Elden Ring',
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: 'Url da imagem do jogo',
  })
  coverImageUrl: string;

  @IsString()
  @ApiProperty({
    description: 'Descrição do jogo',
  })
  description: string;

  @IsNumber()
  @ApiProperty({
    description: 'Ano de lançamento do jogo',
  })
  year: number;

  @IsNumber()
  @ApiProperty({
    description: 'Classificação no IMDB (0 a 5)',
  })
  imdbScore: number;

  @IsUrl()
  @ApiProperty({
    description: 'Url do trailer do jogo',
  })
  urlTrailerYT: string;

  @IsUrl()
  @ApiProperty({
    description: 'Url da gameplay do jogo',
  })
  urlGameplayYT: string;
  genreName: string;
}

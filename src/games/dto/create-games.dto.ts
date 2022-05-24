// import { IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGamesDto {
  @ApiProperty({
    description: 'O nome de um jogo',
    example: 'Elden Ring',
  })
  name: string;
}

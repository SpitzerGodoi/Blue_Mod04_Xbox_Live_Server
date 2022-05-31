import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGenreDto {
  @IsString()
  @ApiProperty({
    description: 'O nome de um gênero de game.',
    example: 'Ação',
  })
  name: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class CreateGenreDto {
  @ApiProperty({
    description: 'O nome do gênero.',
    example: 'Ação',
  })
  name: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsUrl, IsString } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @ApiProperty({
    description: 'O nome usado para o perfil',
    example: 'Leandro Spitzer',
  })
  name: string;

  @IsUrl()
  @ApiProperty({
    description: 'Imagem do Perfil',
    example: 'https://avatars.githubusercontent.com/u/97927192?v=4',
  })
  image: string;
  userId: string;
  gameId?: string;
}

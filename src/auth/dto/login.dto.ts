import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'nickname do usuário',
    example: 'leandrospitzer',
  })
  nickname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'senha do usuário',
    example: 'Abcd@1234',
  })
  password: string;
}

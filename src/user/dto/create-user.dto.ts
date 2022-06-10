import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({
    description: 'nome de usuário',
    example: 'chrisktventura',
  })
  nickname: string;

  @IsEmail()
  @ApiProperty({
    description: 'email de usuário para login',
    example: 'chrisventura@gmail.com',
  })
  email: string;

  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha muito fraca',
  })
  @ApiProperty({
    description: 'a senha para login',
    example: 'Abcd@1234',
  })
  password: string;

  @IsNumber()
  // @Matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
  @ApiProperty({
    description: 'o numero do cpf',
    example: '12345678901',
  })
  cpf: number;

  @IsBoolean()
  @ApiProperty({
    description: 'o usuario é um administrador',
    example: 'yes(true) or no(false)',
  })
  isAdmin: boolean;
  confirmPassword: string;
}

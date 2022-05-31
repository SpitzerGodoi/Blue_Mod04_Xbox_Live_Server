import { ApiProperty } from '@nestjs/swagger';
import { User } from './../../user/entities/user.entity';
export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT gerado pelo login',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaWNrbmFtZSI6ImNocmlza3R2ZW50dXJhIiwiaWF0IjoxNjUzOTMxMTkzLCJleHAiOjE2NTQwMTc1OTN9.O3VG8mZCdq5juPyI0oSa4wM1yS5gA7ON3xcAoXuLZ_0',
  })
  token: string;

  @ApiProperty({
    description: 'dados do usuário autenticado',
  })
  user: User;
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateGamesDto } from './dto/create-games.dto';
import { UpdateGamesDto } from './dto/update-games.dto';
import { GamesService } from './games.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Game } from './entities/games.entity';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { User } from 'src/user/entities/user.entity';

@ApiTags('games')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('games')
export class GamesController {
  constructor(private readonly gameService: GamesService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar OS Jogos',
  })
  findAll(): Promise<Game[]> {
    return this.gameService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Visualizar um Jogo',
  })
  findOne(@Param('id') id: string): Promise<Game> {
    return this.gameService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Criar um jogo',
  })
  create(@LoggedUser() user: User, @Body() dto: CreateGamesDto): Promise<Game> {
    return this.gameService.create(dto, user);
  }
  @Patch(':id')
  @ApiOperation({
    summary: 'Editar Um jogo pelo ID',
  })
  update(
    @LoggedUser() user: User,
    @Param('id') id: string,
    @Body() dto: UpdateGamesDto,
  ): Promise<Game> {
    return this.gameService.update(id, dto, user);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover um jogo pelo ID',
  })
  delete(@LoggedUser() user: User, @Param('id') id: string) {
    return this.gameService.delete(id, user);
  }
}

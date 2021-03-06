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
} from '@nestjs/common';
import { CreateGamesDto } from './dto/create-games.dto';
import { UpdateGamesDto } from './dto/update-games.dto';
import { GamesService } from './games.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Game } from './entities/games.entity';

@ApiTags('games')
@Controller('games')
export class GamesController {
  constructor(private readonly gameService: GamesService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar os jogos',
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
  create(@Body() dto: CreateGamesDto): Promise<Game> {
    return this.gameService.create(dto);
  }
  @Patch(':id')
  @ApiOperation({
    summary: 'Editar Um jogo pelo ID',
  })
  update(@Param('id') id: string, @Body() dto: UpdateGamesDto): Promise<Game> {
    return this.gameService.update(id, dto);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover um jogo pelo ID',
  })
  delete(@Param('id') id: string) {
    this.gameService.delete(id);
  }
}

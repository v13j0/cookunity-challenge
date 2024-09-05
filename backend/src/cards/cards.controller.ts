import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Logger,
  NotFoundException,
  InternalServerErrorException,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiProperty,
  ApiBody,
} from '@nestjs/swagger';
import { CardsService } from './cards.service';
import { Card, CreateCardDto, UpdateCardDto } from './entities/card.entity';

class BattleResult {
  @ApiProperty({ example: 'Pikachu', description: 'The winner of the battle' })
  winner: string;

  @ApiProperty({
    example: 'Pikachu used Thunder Shock and won!',
    description: 'Details of the battle',
  })
  details: string;
}

class WeaknessesAndResistances {
  @ApiProperty({
    type: [String],
    example: ['Ground'],
    description: 'The weaknesses of the Pokémon',
  })
  weaknesses: string[];

  @ApiProperty({
    type: [String],
    example: ['Electric'],
    description: 'The resistances of the Pokémon',
  })
  resistances: string[];
}

@ApiTags('cards')
@Controller('cards')
export class CardsController {
  private readonly logger = new Logger(CardsController.name);
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new card' })
  @ApiResponse({
    status: 201,
    description: 'The card has been successfully created.',
    type: Card,
  })
  async create(@Body() createCardDto: CreateCardDto): Promise<Card> {
    return this.cardsService.create(createCardDto);
  }

  @Get('expansions')
  @ApiOperation({ summary: 'Get all unique expansions' })
  @ApiResponse({
    status: 200,
    description: 'Return all unique expansions.',
    type: [String],
  })
  async getUniqueExpansions(): Promise<string[]> {
    try {
      return await this.cardsService.getUniqueExpansions();
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Error fetching expansions: ${err.message}`, err.stack);
      throw new InternalServerErrorException('Failed to fetch expansions');
    }
  }

  @Get('types')
  @ApiOperation({ summary: 'Get unique card types' })
  @ApiResponse({
    status: 200,
    description: 'Return unique card types.',
    type: [String],
  })
  async getUniqueTypes(): Promise<string[]> {
    try {
      return await this.cardsService.getUniqueTypes();
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Error fetching types: ${err.message}`, err.stack);
      throw new InternalServerErrorException('Failed to fetch types');
    }
  }

  @Get()
  async findAll(
    @Query() filters: Record<string, any>,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Card[]> {
    return this.cardsService.findAll(filters, page, limit);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a card by ID' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Return the card with the specified ID.',
    type: Card,
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Card> {
    const card = await this.cardsService.findOne(id);
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    return card;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a card' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ description: 'The card data to update', type: Card })
  @ApiResponse({
    status: 200,
    description: 'The updated card.',
    type: Card,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCardDto: UpdateCardDto,
  ): Promise<Card> {
    return this.cardsService.update(id, updateCardDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a card' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'The card has been successfully deleted.',
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.cardsService.remove(id);
  }

  @Get('battle/:attackerId/:defenderId')
  @ApiOperation({ summary: 'Simulate a battle between two cards' })
  @ApiParam({ name: 'attackerId', type: 'number' })
  @ApiParam({ name: 'defenderId', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Return the battle result.',
    type: BattleResult,
  })
  async simulateBattle(
    @Param('attackerId', ParseIntPipe) attackerId: number,
    @Param('defenderId', ParseIntPipe) defenderId: number,
  ): Promise<BattleResult> {
    return this.cardsService.simulateBattle(attackerId, defenderId);
  }

  @Get(':id/weaknesses-resistances')
  @ApiOperation({ summary: 'Get weaknesses and resistances for a card' })
  @ApiParam({ name: 'id', type: 'number' })
  @ApiResponse({
    status: 200,
    description: 'Return the weaknesses and resistances.',
    type: WeaknessesAndResistances,
  })
  async getWeaknessesAndResistances(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<WeaknessesAndResistances> {
    return this.cardsService.getWeaknessesAndResistances(id);
  }
}

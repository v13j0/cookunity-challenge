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
  ApiQuery,
} from '@nestjs/swagger';
import { CardsService } from './cards.service';
import { Card, CreateCardDto, UpdateCardDto } from './entities/card.entity';

class BattleResult {
  @ApiProperty({
    example: 'Pikachu',
    description: 'The name of the winning Pokémon',
  })
  winner: string;

  @ApiProperty({
    example:
      "Pikachu used Thunder Shock. It's super effective! Charmander fainted.",
    description: 'A detailed description of the battle outcome',
  })
  details: string;
}

class WeaknessesAndResistances {
  @ApiProperty({
    type: [String],
    example: ['Ground', 'Rock'],
    description: 'Types that the Pokémon is weak against',
  })
  weaknesses: string[];

  @ApiProperty({
    type: [String],
    example: ['Electric', 'Steel'],
    description: 'Types that the Pokémon is resistant to',
  })
  resistances: string[];
}

@ApiTags('Pokémon Cards')
@Controller('cards')
export class CardsController {
  private readonly logger = new Logger(CardsController.name);
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Pokémon card' })
  @ApiBody({ type: CreateCardDto })
  @ApiResponse({
    status: 201,
    description: 'The Pokémon card has been successfully created.',
    type: Card,
  })
  async create(@Body() createCardDto: CreateCardDto): Promise<Card> {
    return this.cardsService.create(createCardDto);
  }

  @Get('expansions')
  @ApiOperation({ summary: 'Get all unique Pokémon card expansions' })
  @ApiResponse({
    status: 200,
    description: 'Returns all unique Pokémon card expansions.',
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
  @ApiOperation({ summary: 'Get unique Pokémon card types' })
  @ApiResponse({
    status: 200,
    description: 'Returns unique Pokémon card types.',
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
  @ApiOperation({ summary: 'Get all Pokémon cards with optional filters' })
  @ApiQuery({
    name: 'name',
    required: false,
    type: String,
    description: 'Filter by Pokémon name',
  })
  @ApiQuery({
    name: 'expansion',
    required: false,
    type: String,
    description: 'Filter by expansion set',
  })
  @ApiQuery({
    name: 'type',
    required: false,
    type: String,
    description: 'Filter by Pokémon type',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Number of items per page',
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns a list of Pokémon cards based on the provided filters.',
    type: [Card],
  })
  async findAll(
    @Query() filters: Record<string, any>,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<Card[]> {
    this.logger.log(
      `Received request for cards with query: ${JSON.stringify(filters)}`,
    );
    try {
      const result = await this.cardsService.findAll(filters, page, limit);
      this.logger.log(`Returning ${result.length} cards`);
      return result;
    } catch (error) {
      this.logger.error(`Error fetching cards: ${error.message}`, error.stack);
      throw error; // Let NestJS handle the error response
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a Pokémon card by ID' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the Pokémon card',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the Pokémon card with the specified ID.',
    type: Card,
  })
  @ApiResponse({
    status: 404,
    description: 'Pokémon card not found.',
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Card> {
    const card = await this.cardsService.findOne(id);
    if (!card) {
      throw new NotFoundException(`Pokémon card with ID ${id} not found`);
    }
    return card;
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a Pokémon card' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the Pokémon card to update',
  })
  @ApiBody({ type: UpdateCardDto })
  @ApiResponse({
    status: 200,
    description: 'The updated Pokémon card.',
    type: Card,
  })
  @ApiResponse({
    status: 404,
    description: 'Pokémon card not found.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCardDto: UpdateCardDto,
  ): Promise<Card> {
    return this.cardsService.update(id, updateCardDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Pokémon card' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the Pokémon card to delete',
  })
  @ApiResponse({
    status: 200,
    description: 'The Pokémon card has been successfully deleted.',
  })
  @ApiResponse({
    status: 404,
    description: 'Pokémon card not found.',
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.cardsService.remove(id);
  }

  @Get('battle/:attackerId/:defenderId')
  @ApiOperation({ summary: 'Simulate a battle between two Pokémon cards' })
  @ApiParam({
    name: 'attackerId',
    type: 'number',
    description: 'The ID of the attacking Pokémon card',
  })
  @ApiParam({
    name: 'defenderId',
    type: 'number',
    description: 'The ID of the defending Pokémon card',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the battle result.',
    type: BattleResult,
  })
  @ApiResponse({
    status: 404,
    description: 'One or both Pokémon cards not found.',
  })
  async simulateBattle(
    @Param('attackerId', ParseIntPipe) attackerId: number,
    @Param('defenderId', ParseIntPipe) defenderId: number,
  ): Promise<BattleResult> {
    return this.cardsService.simulateBattle(attackerId, defenderId);
  }

  @Get(':id/weaknesses-resistances')
  @ApiOperation({
    summary: 'Get weaknesses and resistances for a Pokémon card',
  })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the Pokémon card',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the weaknesses and resistances of the Pokémon card.',
    type: WeaknessesAndResistances,
  })
  @ApiResponse({
    status: 404,
    description: 'Pokémon card not found.',
  })
  async getWeaknessesAndResistances(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<WeaknessesAndResistances> {
    return this.cardsService.getWeaknessesAndResistances(id);
  }
}

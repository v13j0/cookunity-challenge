import { ApiProperty } from '@nestjs/swagger';

export class Card {
  @ApiProperty({ example: 1, description: 'The unique identifier of the card' })
  id: number;

  @ApiProperty({
    example: 'pikachu.png',
    description: 'The thumbnail image of the Pokémon',
  })
  thumb: string;

  @ApiProperty({ example: 'Pikachu', description: 'The name of the Pokémon' })
  name: string;

  @ApiProperty({ example: 'Electric', description: 'The type of the Pokémon' })
  type: string;

  @ApiProperty({
    example: 'Base Set',
    description: 'The expansion set of the card',
  })
  expansion: string;

  @ApiProperty({ example: 'Rare', description: 'The rarity of the card' })
  rarity: string;

  @ApiProperty({ example: 60, description: 'The HP of the Pokémon' })
  hp: number;

  @ApiProperty({ example: 50, description: 'The attack power of the Pokémon' })
  attack: number;

  @ApiProperty({
    example: ['Ground'],
    description: 'The weaknesses of the Pokémon',
  })
  weaknesses: string[];

  @ApiProperty({
    example: ['Electric'],
    description: 'The resistances of the Pokémon',
  })
  resistances: string[];
}

export class CreateCardDto {
  @ApiProperty({
    example: 'pikachu.png',
    description: 'The thumbnail image of the Pokémon',
  })
  thumb: string;

  @ApiProperty({ example: 'Pikachu', description: 'The name of the Pokémon' })
  name: string;

  @ApiProperty({ example: 'Electric', description: 'The type of the Pokémon' })
  type: string;

  @ApiProperty({
    example: 'Base Set',
    description: 'The expansion set of the card',
  })
  expansion: string;

  @ApiProperty({ example: 'Rare', description: 'The rarity of the card' })
  rarity: string;

  @ApiProperty({ example: 60, description: 'The HP of the Pokémon' })
  hp: number;

  @ApiProperty({ example: 50, description: 'The attack power of the Pokémon' })
  attack: number;

  @ApiProperty({
    example: ['Ground'],
    description: 'The weaknesses of the Pokémon',
  })
  weaknesses: string[];

  @ApiProperty({
    example: ['Electric'],
    description: 'The resistances of the Pokémon',
  })
  resistances: string[];
}

export class UpdateCardDto {
  @ApiProperty({
    example: 'pikachu.png',
    description: 'The thumbnail image of the Pokémon',
    required: false,
  })
  thumb?: string;

  @ApiProperty({
    example: 'Pikachu',
    description: 'The name of the Pokémon',
    required: false,
  })
  name?: string;

  @ApiProperty({
    example: 'Electric',
    description: 'The type of the Pokémon',
    required: false,
  })
  type?: string;

  @ApiProperty({
    example: 'Base Set',
    description: 'The expansion set of the card',
    required: false,
  })
  expansion?: string;

  @ApiProperty({
    example: 'Rare',
    description: 'The rarity of the card',
    required: false,
  })
  rarity?: string;

  @ApiProperty({
    example: 60,
    description: 'The HP of the Pokémon',
    required: false,
  })
  hp?: number;

  @ApiProperty({
    example: 50,
    description: 'The attack power of the Pokémon',
    required: false,
  })
  attack?: number;

  @ApiProperty({
    example: ['Ground'],
    description: 'The weaknesses of the Pokémon',
    required: false,
  })
  weaknesses?: string[];

  @ApiProperty({
    example: ['Electric'],
    description: 'The resistances of the Pokémon',
    required: false,
  })
  resistances?: string[];
}

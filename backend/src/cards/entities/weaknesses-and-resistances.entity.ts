import { ApiProperty } from '@nestjs/swagger';

export class WeaknessesAndResistances {
  @ApiProperty({
    type: [String],
    example: ['Ground'],
    description: 'List of weaknesses that increase damage taken by the Pokémon',
  })
  weaknesses: string[];

  @ApiProperty({
    type: [String],
    example: ['Electric'],
    description: 'List of resistances that reduce damage taken by the Pokémon',
  })
  resistances: string[];
}

import { ApiProperty } from '@nestjs/swagger';

export class WeaknessesAndResistances {
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

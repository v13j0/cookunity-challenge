import { Test, TestingModule } from '@nestjs/testing';
import { CardsService } from './cards.service';

describe('CardsService', () => {
  let service: CardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardsService],
    }).compile();

    service = module.get<CardsService>(CardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a card', async () => {
    const card = await service.create({
      name: 'Pikachu',
      type: 'Electric',
      hp: 60,
      attack: 50,
      weaknesses: ['Fighting'],
      resistances: ['Steel'],
      thumb: 'https://images.pokemontcg.io/base1/58.png',
      expansion: 'Base',
      rarity: 'Common',
    });
    expect(card).toBeDefined();
    expect(card.name).toBe('Pikachu');
  });
});

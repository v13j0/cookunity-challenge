import { Test, TestingModule } from '@nestjs/testing';
import { CardsService } from './cards.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('CardsService', () => {
  let service: CardsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardsService,
        {
          provide: PrismaService,
          useValue: {
            card: {
              create: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CardsService>(CardsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a card', async () => {
    const cardData = {
      name: 'Pikachu',
      type: 'Electric',
      hp: 60,
      attack: 50,
      weaknesses: ['Fighting'],
      resistances: ['Steel'],
      thumb: 'https://images.pokemontcg.io/base1/58.png',
      expansion: 'Base',
      rarity: 'Common',
    };

    const expectedCard = { id: 1, ...cardData };

    (prismaService.card.create as jest.Mock).mockResolvedValue(expectedCard);

    const card = await service.create(cardData);

    expect(card).toEqual(expectedCard);
    expect(prismaService.card.create).toHaveBeenCalledWith({ data: cardData });
  });

  it('should throw an error if card not found', async () => {
    (prismaService.card.findUnique as jest.Mock).mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    expect(prismaService.card.findUnique).toHaveBeenCalledWith({
      where: { id: 999 },
    });
  });

  it('should handle database unreachable error', async () => {
    (prismaService.card.findUnique as jest.Mock).mockRejectedValue(
      new Error('Database unreachable'),
    );

    await expect(service.findOne(1)).rejects.toThrow(
      InternalServerErrorException,
    );
    expect(prismaService.card.findUnique).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});

import {
  Injectable,
  Logger,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Card, CreateCardDto, UpdateCardDto } from './entities/card.entity';
import { WeaknessesAndResistances } from './entities/weaknesses-and-resistances.entity';

@Injectable()
export class CardsService {
  private readonly logger = new Logger(CardsService.name);

  constructor(private prisma: PrismaService) {}

  async create(createCardDto: CreateCardDto): Promise<Card> {
    try {
      const card = await this.prisma.card.create({
        data: createCardDto,
      });
      this.logger.log(`Created card: ${JSON.stringify(card)}`);
      return card;
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Error creating card: ${err.message}`, err.stack);
      throw new InternalServerErrorException(
        `Failed to create card: ${err.message}`,
      );
    }
  }

  async findAll(
    filters: { name?: string; expansion?: string; type?: string },
    page: number,
    limit: number,
  ): Promise<Card[]> {
    try {
      const { name, expansion, type } = filters;
      const cards = await this.prisma.card.findMany({
        where: {
          name: name ? { contains: name, mode: 'insensitive' } : undefined,
          expansion: expansion || undefined,
          type: type || undefined,
        },
        skip: (page - 1) * limit,
        take: limit,
      });
      this.logger.log(`Found ${cards.length} cards`);
      return cards;
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Error finding cards: ${err.message}`, err.stack);
      throw new InternalServerErrorException(
        `Failed to fetch cards: ${err.message}`,
      );
    }
  }

  async findOne(id: number): Promise<Card> {
    try {
      const card = await this.prisma.card.findUnique({
        where: { id },
      });

      if (!card) {
        throw new NotFoundException(`Card with ID ${id} not found`);
      }

      return card;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      const err = error as Error;
      this.logger.error(`Error finding card: ${err.message}`, err.stack);
      throw new InternalServerErrorException(
        `Failed to fetch card: ${err.message}`,
      );
    }
  }

  async update(id: number, updateCardDto: UpdateCardDto): Promise<Card> {
    try {
      const card = await this.prisma.card.update({
        where: { id },
        data: updateCardDto,
      });
      this.logger.log(`Updated card: ${JSON.stringify(card)}`);
      return card;
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Error updating card: ${err.message}`, err.stack);
      throw new InternalServerErrorException(
        `Failed to update card: ${err.message}`,
      );
    }
  }

  async remove(id: number): Promise<Card> {
    try {
      const card = await this.prisma.card.delete({
        where: { id },
      });
      this.logger.log(`Deleted card: ${JSON.stringify(card)}`);
      return card;
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Error deleting card: ${err.message}`, err.stack);
      throw new InternalServerErrorException(
        `Failed to delete card: ${err.message}`,
      );
    }
  }

  async getUniqueExpansions(): Promise<string[]> {
    try {
      const expansions = await this.prisma.card.findMany({
        select: { expansion: true },
        distinct: ['expansion'],
      });
      return expansions.map((card) => card.expansion);
    } catch (error) {
      const err = error as Error;
      this.logger.error(
        `Error fetching unique expansions: ${err.message}`,
        err.stack,
      );
      throw new InternalServerErrorException(
        `Failed to fetch unique expansions: ${err.message}`,
      );
    }
  }

  async getUniqueTypes(): Promise<string[]> {
    try {
      const types = await this.prisma.card.findMany({
        select: { type: true },
        distinct: ['type'],
      });
      return types.map((card) => card.type);
    } catch (error) {
      const err = error as Error;
      this.logger.error(
        `Error fetching unique types: ${err.message}`,
        err.stack,
      );
      throw new InternalServerErrorException(
        `Failed to fetch unique types: ${err.message}`,
      );
    }
  }

  async getWeaknessesAndResistances(
    cardId: number,
  ): Promise<WeaknessesAndResistances> {
    try {
      const card = await this.findOne(cardId);
      const allCards = await this.prisma.card.findMany();

      const weaknesses = allCards
        .filter((c) => card.weaknesses.includes(c.type))
        .map((c) => c.type);
      const resistances = allCards
        .filter((c) => card.resistances.includes(c.type))
        .map((c) => c.type);

      return { weaknesses, resistances };
    } catch (error) {
      const err = error as Error;
      this.logger.error(
        `Error getting weaknesses and resistances: ${err.message}`,
        err.stack,
      );
      throw new InternalServerErrorException(
        `Failed to get weaknesses and resistances: ${err.message}`,
      );
    }
  }

  async simulateBattle(
    attackerId: number,
    defenderId: number,
  ): Promise<{ winner: string; details: string }> {
    try {
      const attacker = await this.findOne(attackerId);
      const defender = await this.findOne(defenderId);

      let damage = attacker.attack;
      let details = `${attacker.name} (${attacker.type}) attacks ${defender.name} (${defender.type}).\n`;

      if (defender.weaknesses.includes(attacker.type)) {
        damage *= 2;
        details += `${defender.name} is weak to ${attacker.type}! Damage is doubled.\n`;
      }

      if (defender.resistances.includes(attacker.type)) {
        damage -= 20;
        details += `${defender.name} is resistant to ${attacker.type}. Damage is reduced by 20.\n`;
      }

      damage = Math.max(0, damage);
      details += `Final damage: ${damage}\n`;

      const isAttackerWinner = damage > defender.hp;
      details += isAttackerWinner
        ? `${attacker.name} defeats ${defender.name}!`
        : `${defender.name} survives the attack!`;

      return {
        winner: isAttackerWinner ? attacker.name : defender.name,
        details,
      };
    } catch (error) {
      const err = error as Error;
      this.logger.error(`Error in simulateBattle: ${err.message}`, err.stack);
      throw new InternalServerErrorException(
        `Failed to simulate battle: ${err.message}`,
      );
    }
  }
}

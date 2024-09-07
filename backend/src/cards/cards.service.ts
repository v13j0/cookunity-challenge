import {
  Injectable,
  Logger,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Card, CreateCardDto, UpdateCardDto } from './entities/card.entity';
import { WeaknessesAndResistances } from './entities/weaknesses-and-resistances.entity';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class CardsService {
  private readonly logger = new Logger(CardsService.name);

  constructor(private prisma: PrismaService) {}

  /**
   * Creates a new card in the database.
   * @param createCardDto - The data for creating a new card.
   * @returns The created card.
   * @throws {BadRequestException} If there's a unique constraint violation.
   * @throws {InternalServerErrorException} If there's an unexpected error during creation.
   */
  async create(createCardDto: CreateCardDto): Promise<Card> {
    try {
      const card = await this.prisma.card.create({
        data: createCardDto,
      });
      this.logger.log(`Created card: ${JSON.stringify(card)}`);
      return card;
    } catch (error) {
      this.handlePrismaError(error, 'create card');
    }
  }

  /**
   * Fetches all cards with optional filters, pagination, and limit.
   * @param filters - Optional filters for name, expansion, and type.
   * @param page - The page number for pagination.
   * @param limit - The number of items per page.
   * @returns An array of cards matching the criteria.
   * @throws {InternalServerErrorException} If there's an unexpected error during fetching.
   */
  async findAll(
    filters: { name?: string; expansion?: string; type?: string },
    page: number,
    limit: number,
  ): Promise<Card[]> {
    try {
      const { name, expansion, type } = filters;
      const hasConditions = name || expansion || type;
      const cards = await this.prisma.card.findMany({
        ...(hasConditions && {
          where: {
            ...(name && { name: { contains: name, mode: 'insensitive' } }),
            ...(expansion && { expansion }),
            ...(type && { type }),
          },
        }),
        skip: (page - 1) * limit,
        take: limit,
      });
      this.logger.log(`Found ${cards.length} cards`);
      return cards;
    } catch (error) {
      this.handlePrismaError(error, 'fetch cards');
    }
  }

  /**
   * Fetches a single card by its ID.
   * @param id - The ID of the card to fetch.
   * @returns The card with the specified ID.
   * @throws {NotFoundException} If the card is not found.
   * @throws {InternalServerErrorException} If there's an unexpected error during fetching.
   */
  async findOne(id: number): Promise<Card> {
    try {
      const card = await this.prisma.card.findUnique({ where: { id } });
      if (!card) {
        throw new NotFoundException(`Card with ID ${id} not found`);
      }
      return card;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.handlePrismaError(error, 'fetch card');
    }
  }

  /**
   * Handles Prisma-specific errors and throws appropriate exceptions.
   * @param error - The error to handle.
   * @param operation - The operation during which the error occurred.
   * @throws {BadRequestException} For unique constraint violations.
   * @throws {NotFoundException} For record not found errors.
   * @throws {InternalServerErrorException} For all other errors.
   */
  private handlePrismaError(error: unknown, operation: string): never {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new BadRequestException(
          `Unique constraint failed during ${operation}`,
        );
      }
      if (error.code === 'P2025') {
        throw new NotFoundException(`Record not found during ${operation}`);
      }
    }
    const err = error as Error;
    this.logger.error(`Error during ${operation}: ${err.message}`, err.stack);
    throw new InternalServerErrorException(
      `Failed to ${operation}: ${err.message}`,
    );
  }

  /**
   * Updates a card's details in the database.
   * @param id - The ID of the card to update.
   * @param updateCardDto - The data to update the card with.
   * @returns The updated card.
   * @throws {NotFoundException} If the card is not found.
   * @throws {InternalServerErrorException} If there's an unexpected error during updating.
   */
  async update(id: number, updateCardDto: UpdateCardDto): Promise<Card> {
    try {
      const card = await this.prisma.card.update({
        where: { id },
        data: updateCardDto,
      });
      this.logger.log(`Updated card: ${JSON.stringify(card)}`);
      return card;
    } catch (error) {
      this.handlePrismaError(error, 'update card');
    }
  }

  /**
   * Removes a card from the database.
   * @param id - The ID of the card to remove.
   * @returns The deleted card.
   * @throws {NotFoundException} If the card is not found.
   * @throws {InternalServerErrorException} If there's an unexpected error during deletion.
   */
  async remove(id: number): Promise<Card> {
    try {
      const card = await this.prisma.card.delete({
        where: { id },
      });
      this.logger.log(`Deleted card: ${JSON.stringify(card)}`);
      return card;
    } catch (error) {
      this.handlePrismaError(error, 'delete card');
    }
  }

  /**
   * Fetches all unique expansions from the database.
   * @returns An array of unique expansion names.
   * @throws {InternalServerErrorException} If there's an unexpected error during fetching.
   */
  async getUniqueExpansions(): Promise<string[]> {
    try {
      const expansions = await this.prisma.card.findMany({
        select: { expansion: true },
        distinct: ['expansion'],
      });
      return expansions.map((card) => card.expansion);
    } catch (error) {
      this.handlePrismaError(error, 'fetch unique expansions');
    }
  }

  /**
   * Fetches all unique types from the database.
   * @returns An array of unique type names.
   * @throws {InternalServerErrorException} If there's an unexpected error during fetching.
   */
  async getUniqueTypes(): Promise<string[]> {
    try {
      const types = await this.prisma.card.findMany({
        select: { type: true },
        distinct: ['type'],
      });
      return types.map((card) => card.type);
    } catch (error) {
      this.handlePrismaError(error, 'fetch unique types');
    }
  }

  /**
   * Retrieves the weaknesses and resistances for a specific card.
   * @param cardId - The ID of the card to get weaknesses and resistances for.
   * @returns An object containing arrays of weaknesses and resistances.
   * @throws {NotFoundException} If the card is not found.
   * @throws {InternalServerErrorException} If there's an unexpected error during fetching.
   */
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
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.handlePrismaError(error, 'get weaknesses and resistances');
    }
  }

  /**
   * Simulates a battle between two cards.
   * @param attackerId - The ID of the attacking card.
   * @param defenderId - The ID of the defending card.
   * @returns An object containing the winner's name and battle details.
   * @throws {NotFoundException} If either card is not found.
   * @throws {InternalServerErrorException} If there's an unexpected error during simulation.
   */
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
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.handlePrismaError(error, 'simulate battle');
    }
  }
}

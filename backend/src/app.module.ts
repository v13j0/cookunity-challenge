import { Module } from '@nestjs/common';
import { CardsModule } from './cards/cards.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [CardsModule],
  providers: [PrismaService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { FinanciacionController } from './financiacion.controller';
import { FinanciacionService } from './financiacion.service';
import { PrismaModule } from '../prisma/prisma.module';


@Module({
  imports: [PrismaModule],
  controllers: [FinanciacionController],
  providers: [FinanciacionService],
  exports: [FinanciacionService],
})
export class FinanciacionModule {}

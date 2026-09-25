import { Module } from '@nestjs/common';
import { CategoriaNivel2Service } from './categoria-nivel2.service';
import { CategoriaNivel2Controller } from './categoria-nivel2.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CategoriaNivel2Controller],
  providers: [CategoriaNivel2Service],
})
export class CategoriaNivel2Module {}

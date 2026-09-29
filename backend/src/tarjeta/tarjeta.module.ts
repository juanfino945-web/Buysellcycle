import { Module } from '@nestjs/common';
import { TarjetaController } from './tarjeta.controller';
import { TarjetaService } from './tarjeta.service';
import { PrismaModule } from '../prisma/prisma.module';


@Module({
  imports: [PrismaModule],
  controllers: [TarjetaController],
  providers: [TarjetaService],
})
export class TarjetaModule {}
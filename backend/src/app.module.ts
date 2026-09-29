import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProductoModule } from './producto/producto.module';
import { DepositoModule } from './deposito/deposito.module';
import { StockModule } from './stock/stock.module';
import { CategoriaNivel1Module } from './categoria-nivel1/categoria-nivel1.module';
import { CategoriaNivel2Module } from './categoria-nivel2/categoria-nivel2.module';
import { MarcaModule } from './marca/marca.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { SucursalModule } from './sucursal/sucursal.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ClienteModule } from './cliente/cliente.module';
import { PresupuestoModule } from './presupuesto/presupuesto.module';
import { ProvinciaModule } from './provincia/provincia.module';
import { LocalidadModule } from './localidad/localidad.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TarjetaModule } from './tarjeta/tarjeta.module';
import { BancoModule } from './banco/banco.module';
import { PlanModule } from './plan/plan.module';
import { FinanciacionModule } from './financiacion/financiacion.module';

@Module({
 imports: [ScheduleModule.forRoot(), PrismaModule, ProductoModule, DepositoModule, StockModule, CategoriaNivel1Module, CategoriaNivel2Module, MarcaModule, ProveedorModule, SucursalModule, UsuarioModule, ClienteModule, PresupuestoModule, ProvinciaModule, LocalidadModule, TarjetaModule, BancoModule, PlanModule, FinanciacionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

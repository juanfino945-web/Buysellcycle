"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const producto_module_1 = require("./producto/producto.module");
const deposito_module_1 = require("./deposito/deposito.module");
const stock_module_1 = require("./stock/stock.module");
const categoria_nivel1_module_1 = require("./categoria-nivel1/categoria-nivel1.module");
const categoria_nivel2_module_1 = require("./categoria-nivel2/categoria-nivel2.module");
const marca_module_1 = require("./marca/marca.module");
const proveedor_module_1 = require("./proveedor/proveedor.module");
const sucursal_module_1 = require("./sucursal/sucursal.module");
const usuario_module_1 = require("./usuario/usuario.module");
const cliente_module_1 = require("./cliente/cliente.module");
const presupuesto_module_1 = require("./presupuesto/presupuesto.module");
const provincia_module_1 = require("./provincia/provincia.module");
const localidad_module_1 = require("./localidad/localidad.module");
const schedule_1 = require("@nestjs/schedule");
const tarjeta_module_1 = require("./tarjeta/tarjeta.module");
const banco_module_1 = require("./banco/banco.module");
const plan_module_1 = require("./plan/plan.module");
const financiacion_module_1 = require("./financiacion/financiacion.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [schedule_1.ScheduleModule.forRoot(), prisma_module_1.PrismaModule, producto_module_1.ProductoModule, deposito_module_1.DepositoModule, stock_module_1.StockModule, categoria_nivel1_module_1.CategoriaNivel1Module, categoria_nivel2_module_1.CategoriaNivel2Module, marca_module_1.MarcaModule, proveedor_module_1.ProveedorModule, sucursal_module_1.SucursalModule, usuario_module_1.UsuarioModule, cliente_module_1.ClienteModule, presupuesto_module_1.PresupuestoModule, provincia_module_1.ProvinciaModule, localidad_module_1.LocalidadModule, tarjeta_module_1.TarjetaModule, banco_module_1.BancoModule, plan_module_1.PlanModule, financiacion_module_1.FinanciacionModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
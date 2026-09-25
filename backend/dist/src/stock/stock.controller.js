"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockController = void 0;
const common_1 = require("@nestjs/common");
const stock_service_1 = require("./stock.service");
const movimiento_stock_dto_1 = require("./dto/movimiento-stock.dto");
const transferencia_stock_dto_1 = require("./dto/transferencia-stock.dto");
let StockController = class StockController {
    stockService;
    constructor(stockService) {
        this.stockService = stockService;
    }
    ingreso(dto) {
        return this.stockService.ingreso(dto);
    }
    egreso(dto) {
        return this.stockService.egreso(dto);
    }
    transferencia(dto) {
        return this.stockService.transferencia(dto);
    }
    findAll() {
        return this.stockService.findAll();
    }
};
exports.StockController = StockController;
__decorate([
    (0, common_1.Post)('ingreso'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [movimiento_stock_dto_1.MovimientoStockDto]),
    __metadata("design:returntype", void 0)
], StockController.prototype, "ingreso", null);
__decorate([
    (0, common_1.Post)('egreso'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [movimiento_stock_dto_1.MovimientoStockDto]),
    __metadata("design:returntype", void 0)
], StockController.prototype, "egreso", null);
__decorate([
    (0, common_1.Post)('transferencia'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [transferencia_stock_dto_1.TransferenciaStockDto]),
    __metadata("design:returntype", void 0)
], StockController.prototype, "transferencia", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StockController.prototype, "findAll", null);
exports.StockController = StockController = __decorate([
    (0, common_1.Controller)('stock'),
    __metadata("design:paramtypes", [stock_service_1.StockService])
], StockController);
//# sourceMappingURL=stock.controller.js.map
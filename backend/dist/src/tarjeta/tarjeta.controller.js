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
exports.TarjetaController = void 0;
const common_1 = require("@nestjs/common");
const tarjeta_service_1 = require("./tarjeta.service");
const create_tarjeta_dto_1 = require("./dto/create-tarjeta.dto");
const update_tarjeta_dto_1 = require("./dto/update-tarjeta.dto");
let TarjetaController = class TarjetaController {
    tarjetaService;
    constructor(tarjetaService) {
        this.tarjetaService = tarjetaService;
    }
    findAll() {
        return this.tarjetaService.findAll();
    }
    findArchivados() {
        return this.tarjetaService.findArchivados();
    }
    findOne(id) {
        return this.tarjetaService.findOne(id);
    }
    create(dto) {
        return this.tarjetaService.create(dto);
    }
    update(id, dto) {
        return this.tarjetaService.update(id, dto);
    }
    restaurar(id) {
        return this.tarjetaService.restaurar(id);
    }
    archivar(id) {
        return this.tarjetaService.archivar(id);
    }
};
exports.TarjetaController = TarjetaController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TarjetaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('archivadas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TarjetaController.prototype, "findArchivados", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TarjetaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tarjeta_dto_1.CreateTarjetaDto]),
    __metadata("design:returntype", void 0)
], TarjetaController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_tarjeta_dto_1.UpdateTarjetaDto]),
    __metadata("design:returntype", void 0)
], TarjetaController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/restaurar'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TarjetaController.prototype, "restaurar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], TarjetaController.prototype, "archivar", null);
exports.TarjetaController = TarjetaController = __decorate([
    (0, common_1.Controller)('tarjetas'),
    __metadata("design:paramtypes", [tarjeta_service_1.TarjetaService])
], TarjetaController);
//# sourceMappingURL=tarjeta.controller.js.map
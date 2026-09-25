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
exports.PresupuestoController = void 0;
const common_1 = require("@nestjs/common");
const presupuesto_service_1 = require("./presupuesto.service");
const create_presupuesto_dto_1 = require("./dto/create-presupuesto.dto");
let PresupuestoController = class PresupuestoController {
    presupuestoService;
    constructor(presupuestoService) {
        this.presupuestoService = presupuestoService;
    }
    create(dto) {
        return this.presupuestoService.create(dto);
    }
    findAll() {
        return this.presupuestoService.findAll();
    }
    findAllArchivados() {
        return this.presupuestoService.findAllArchivados();
    }
    findOne(id) {
        return this.presupuestoService.findOne(id);
    }
    restore(id) {
        return this.presupuestoService.restore(id);
    }
    remove(id) {
        return this.presupuestoService.remove(id);
    }
};
exports.PresupuestoController = PresupuestoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_presupuesto_dto_1.CreatePresupuestoDto]),
    __metadata("design:returntype", void 0)
], PresupuestoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PresupuestoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('archivados'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PresupuestoController.prototype, "findAllArchivados", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PresupuestoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/restaurar'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PresupuestoController.prototype, "restore", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PresupuestoController.prototype, "remove", null);
exports.PresupuestoController = PresupuestoController = __decorate([
    (0, common_1.Controller)('presupuesto'),
    __metadata("design:paramtypes", [presupuesto_service_1.PresupuestoService])
], PresupuestoController);
//# sourceMappingURL=presupuesto.controller.js.map
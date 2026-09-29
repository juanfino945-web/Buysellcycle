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
exports.FinanciacionController = void 0;
const common_1 = require("@nestjs/common");
const financiacion_service_1 = require("./financiacion.service");
const simular_financiacion_dto_1 = require("./dto/simular-financiacion.dto");
let FinanciacionController = class FinanciacionController {
    financiacionService;
    constructor(financiacionService) {
        this.financiacionService = financiacionService;
    }
    historial() {
        return this.financiacionService.historial();
    }
    simular(dto) {
        return this.financiacionService.simular(dto);
    }
};
exports.FinanciacionController = FinanciacionController;
__decorate([
    (0, common_1.Get)('historial'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FinanciacionController.prototype, "historial", null);
__decorate([
    (0, common_1.Post)('simular'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [simular_financiacion_dto_1.SimularFinanciacionDto]),
    __metadata("design:returntype", void 0)
], FinanciacionController.prototype, "simular", null);
exports.FinanciacionController = FinanciacionController = __decorate([
    (0, common_1.Controller)('financiacion'),
    __metadata("design:paramtypes", [financiacion_service_1.FinanciacionService])
], FinanciacionController);
//# sourceMappingURL=financiacion.controller.js.map
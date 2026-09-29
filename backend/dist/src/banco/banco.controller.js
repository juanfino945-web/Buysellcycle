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
exports.BancoController = void 0;
const common_1 = require("@nestjs/common");
const banco_service_1 = require("./banco.service");
const create_banco_dto_1 = require("./dto/create-banco.dto");
const update_banco_dto_1 = require("./dto/update-banco.dto");
let BancoController = class BancoController {
    bancoService;
    constructor(bancoService) {
        this.bancoService = bancoService;
    }
    findAll() {
        return this.bancoService.findAll();
    }
    findArchivados() {
        return this.bancoService.findArchivados();
    }
    findOne(id) {
        return this.bancoService.findOne(id);
    }
    create(dto) {
        return this.bancoService.create(dto);
    }
    update(id, dto) {
        return this.bancoService.update(id, dto);
    }
    restaurar(id) {
        return this.bancoService.restaurar(id);
    }
    archivar(id) {
        return this.bancoService.archivar(id);
    }
};
exports.BancoController = BancoController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BancoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('archivados'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BancoController.prototype, "findArchivados", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BancoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_banco_dto_1.CreateBancoDto]),
    __metadata("design:returntype", void 0)
], BancoController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_banco_dto_1.UpdateBancoDto]),
    __metadata("design:returntype", void 0)
], BancoController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/restaurar'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BancoController.prototype, "restaurar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BancoController.prototype, "archivar", null);
exports.BancoController = BancoController = __decorate([
    (0, common_1.Controller)('bancos'),
    __metadata("design:paramtypes", [banco_service_1.BancoService])
], BancoController);
//# sourceMappingURL=banco.controller.js.map
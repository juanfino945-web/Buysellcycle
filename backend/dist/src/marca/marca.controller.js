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
exports.MarcaController = void 0;
const common_1 = require("@nestjs/common");
const marca_service_1 = require("./marca.service");
const create_marca_dto_1 = require("./dto/create-marca.dto");
const update_marca_dto_1 = require("./dto/update-marca.dto");
let MarcaController = class MarcaController {
    marcaService;
    constructor(marcaService) {
        this.marcaService = marcaService;
    }
    create(createMarcaDto) {
        return this.marcaService.create(createMarcaDto);
    }
    findAll() {
        return this.marcaService.findAll();
    }
    findAllArchivadas() {
        return this.marcaService.findAllArchivadas();
    }
    findOne(id) {
        return this.marcaService.findOne(+id);
    }
    update(id, updateMarcaDto) {
        return this.marcaService.update(+id, updateMarcaDto);
    }
    restore(id) {
        return this.marcaService.restore(+id);
    }
    remove(id) {
        return this.marcaService.remove(+id);
    }
};
exports.MarcaController = MarcaController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_marca_dto_1.CreateMarcaDto]),
    __metadata("design:returntype", void 0)
], MarcaController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MarcaController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('archivadas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MarcaController.prototype, "findAllArchivadas", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarcaController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_marca_dto_1.UpdateMarcaDto]),
    __metadata("design:returntype", void 0)
], MarcaController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/restaurar'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarcaController.prototype, "restore", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MarcaController.prototype, "remove", null);
exports.MarcaController = MarcaController = __decorate([
    (0, common_1.Controller)('marca'),
    __metadata("design:paramtypes", [marca_service_1.MarcaService])
], MarcaController);
//# sourceMappingURL=marca.controller.js.map
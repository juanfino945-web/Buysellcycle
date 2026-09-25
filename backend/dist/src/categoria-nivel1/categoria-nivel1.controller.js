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
exports.CategoriaNivel1Controller = void 0;
const common_1 = require("@nestjs/common");
const categoria_nivel1_service_1 = require("./categoria-nivel1.service");
const create_categoria_nivel1_dto_1 = require("./dto/create-categoria-nivel1.dto");
const update_categoria_nivel1_dto_1 = require("./dto/update-categoria-nivel1.dto");
let CategoriaNivel1Controller = class CategoriaNivel1Controller {
    categoriaNivel1Service;
    constructor(categoriaNivel1Service) {
        this.categoriaNivel1Service = categoriaNivel1Service;
    }
    create(createCategoriaNivel1Dto) {
        return this.categoriaNivel1Service.create(createCategoriaNivel1Dto);
    }
    findAll() {
        return this.categoriaNivel1Service.findAll();
    }
    findAllArchivadas() {
        return this.categoriaNivel1Service.findAllArchivadas();
    }
    findOne(id) {
        return this.categoriaNivel1Service.findOne(+id);
    }
    update(id, updateCategoriaNivel1Dto) {
        return this.categoriaNivel1Service.update(+id, updateCategoriaNivel1Dto);
    }
    restore(id) {
        return this.categoriaNivel1Service.restore(+id);
    }
    remove(id) {
        return this.categoriaNivel1Service.remove(+id);
    }
};
exports.CategoriaNivel1Controller = CategoriaNivel1Controller;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_categoria_nivel1_dto_1.CreateCategoriaNivel1Dto]),
    __metadata("design:returntype", void 0)
], CategoriaNivel1Controller.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoriaNivel1Controller.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('archivadas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CategoriaNivel1Controller.prototype, "findAllArchivadas", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriaNivel1Controller.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_categoria_nivel1_dto_1.UpdateCategoriaNivel1Dto]),
    __metadata("design:returntype", void 0)
], CategoriaNivel1Controller.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/restaurar'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriaNivel1Controller.prototype, "restore", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriaNivel1Controller.prototype, "remove", null);
exports.CategoriaNivel1Controller = CategoriaNivel1Controller = __decorate([
    (0, common_1.Controller)('categoria-nivel1'),
    __metadata("design:paramtypes", [categoria_nivel1_service_1.CategoriaNivel1Service])
], CategoriaNivel1Controller);
//# sourceMappingURL=categoria-nivel1.controller.js.map
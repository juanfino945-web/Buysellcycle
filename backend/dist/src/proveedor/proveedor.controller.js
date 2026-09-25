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
exports.ProveedorController = void 0;
const common_1 = require("@nestjs/common");
const proveedor_service_1 = require("./proveedor.service");
const create_proveedor_dto_1 = require("./dto/create-proveedor.dto");
const update_proveedor_dto_1 = require("./dto/update-proveedor.dto");
let ProveedorController = class ProveedorController {
    proveedorService;
    constructor(proveedorService) {
        this.proveedorService = proveedorService;
    }
    create(createProveedorDto) {
        return this.proveedorService.create(createProveedorDto);
    }
    findAll() {
        return this.proveedorService.findAll();
    }
    findAllArchivados() {
        return this.proveedorService.findAllArchivados();
    }
    findOne(id) {
        return this.proveedorService.findOne(+id);
    }
    update(id, updateProveedorDto) {
        return this.proveedorService.update(+id, updateProveedorDto);
    }
    restore(id) {
        return this.proveedorService.restore(+id);
    }
    remove(id) {
        return this.proveedorService.remove(+id);
    }
};
exports.ProveedorController = ProveedorController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_proveedor_dto_1.CreateProveedorDto]),
    __metadata("design:returntype", void 0)
], ProveedorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProveedorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('archivados'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProveedorController.prototype, "findAllArchivados", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProveedorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_proveedor_dto_1.UpdateProveedorDto]),
    __metadata("design:returntype", void 0)
], ProveedorController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/restaurar'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProveedorController.prototype, "restore", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProveedorController.prototype, "remove", null);
exports.ProveedorController = ProveedorController = __decorate([
    (0, common_1.Controller)('proveedor'),
    __metadata("design:paramtypes", [proveedor_service_1.ProveedorService])
], ProveedorController);
//# sourceMappingURL=proveedor.controller.js.map
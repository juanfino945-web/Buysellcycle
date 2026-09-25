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
exports.SucursalController = void 0;
const common_1 = require("@nestjs/common");
const sucursal_service_1 = require("./sucursal.service");
const create_sucursal_dto_1 = require("./dto/create-sucursal.dto");
const update_sucursal_dto_1 = require("./dto/update-sucursal.dto");
let SucursalController = class SucursalController {
    sucursalService;
    constructor(sucursalService) {
        this.sucursalService = sucursalService;
    }
    create(createSucursalDto) {
        return this.sucursalService.create(createSucursalDto);
    }
    findAll() {
        return this.sucursalService.findAll();
    }
    findAllArchivadas() {
        return this.sucursalService.findAllArchivadas();
    }
    findOne(id) {
        return this.sucursalService.findOne(+id);
    }
    update(id, updateSucursalDto) {
        return this.sucursalService.update(+id, updateSucursalDto);
    }
    restore(id) {
        return this.sucursalService.restore(+id);
    }
    remove(id) {
        return this.sucursalService.remove(+id);
    }
};
exports.SucursalController = SucursalController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sucursal_dto_1.CreateSucursalDto]),
    __metadata("design:returntype", void 0)
], SucursalController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SucursalController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('archivadas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SucursalController.prototype, "findAllArchivadas", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SucursalController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_sucursal_dto_1.UpdateSucursalDto]),
    __metadata("design:returntype", void 0)
], SucursalController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/restaurar'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SucursalController.prototype, "restore", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SucursalController.prototype, "remove", null);
exports.SucursalController = SucursalController = __decorate([
    (0, common_1.Controller)('sucursal'),
    __metadata("design:paramtypes", [sucursal_service_1.SucursalService])
], SucursalController);
//# sourceMappingURL=sucursal.controller.js.map
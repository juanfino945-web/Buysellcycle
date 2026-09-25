"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaNivel1Module = void 0;
const common_1 = require("@nestjs/common");
const categoria_nivel1_service_1 = require("./categoria-nivel1.service");
const categoria_nivel1_controller_1 = require("./categoria-nivel1.controller");
const prisma_module_1 = require("../prisma/prisma.module");
let CategoriaNivel1Module = class CategoriaNivel1Module {
};
exports.CategoriaNivel1Module = CategoriaNivel1Module;
exports.CategoriaNivel1Module = CategoriaNivel1Module = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [categoria_nivel1_controller_1.CategoriaNivel1Controller],
        providers: [categoria_nivel1_service_1.CategoriaNivel1Service],
    })
], CategoriaNivel1Module);
//# sourceMappingURL=categoria-nivel1.module.js.map
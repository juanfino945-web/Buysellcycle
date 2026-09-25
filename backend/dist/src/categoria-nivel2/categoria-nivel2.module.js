"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaNivel2Module = void 0;
const common_1 = require("@nestjs/common");
const categoria_nivel2_service_1 = require("./categoria-nivel2.service");
const categoria_nivel2_controller_1 = require("./categoria-nivel2.controller");
const prisma_module_1 = require("../prisma/prisma.module");
let CategoriaNivel2Module = class CategoriaNivel2Module {
};
exports.CategoriaNivel2Module = CategoriaNivel2Module;
exports.CategoriaNivel2Module = CategoriaNivel2Module = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [categoria_nivel2_controller_1.CategoriaNivel2Controller],
        providers: [categoria_nivel2_service_1.CategoriaNivel2Service],
    })
], CategoriaNivel2Module);
//# sourceMappingURL=categoria-nivel2.module.js.map
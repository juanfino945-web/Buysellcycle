"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTarjetaDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_tarjeta_dto_1 = require("./create-tarjeta.dto");
class UpdateTarjetaDto extends (0, mapped_types_1.PartialType)(create_tarjeta_dto_1.CreateTarjetaDto) {
}
exports.UpdateTarjetaDto = UpdateTarjetaDto;
//# sourceMappingURL=update-tarjeta.dto.js.map
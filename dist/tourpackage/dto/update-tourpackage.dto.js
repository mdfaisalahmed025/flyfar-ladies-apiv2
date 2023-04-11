"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTourpackageDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_tourpackage_dto_1 = require("./create-tourpackage.dto");
class UpdateTourpackageDto extends (0, mapped_types_1.PartialType)(create_tourpackage_dto_1.CreateTourpackageDto) {
}
exports.UpdateTourpackageDto = UpdateTourpackageDto;
//# sourceMappingURL=update-tourpackage.dto.js.map
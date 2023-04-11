"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTravellerDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_traveller_dto_1 = require("./create-traveller.dto");
class updateTravellerDto extends (0, mapped_types_1.PartialType)(create_traveller_dto_1.CreateTravellerDto) {
}
exports.updateTravellerDto = updateTravellerDto;
//# sourceMappingURL=update-traveller.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserProfileDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_userprofile_dto_1 = require("./create-userprofile.dto");
class updateUserProfileDto extends (0, mapped_types_1.PartialType)(create_userprofile_dto_1.CreateUserProfileDto) {
}
exports.updateUserProfileDto = updateUserProfileDto;
//# sourceMappingURL=update-userprofile.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("./create-user.dto");
class updateUserDto extends (0, swagger_1.PartialType)(create_user_dto_1.CreateUserDto) {
}
exports.updateUserDto = updateUserDto;
//# sourceMappingURL=update-user.dto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateinstallmentdto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_installment_dto_1 = require("./create-installment.dto");
class updateinstallmentdto extends (0, mapped_types_1.PartialType)(create_installment_dto_1.CreateInstallmentDto) {
}
exports.updateinstallmentdto = updateinstallmentdto;
//# sourceMappingURL=update-installmentDto.js.map
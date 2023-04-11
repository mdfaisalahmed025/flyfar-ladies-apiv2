"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateRefundPolicy = void 0;
const create_refundpolicy_dto_1 = require("./create-refundpolicy.dto");
const mapped_types_1 = require("@nestjs/mapped-types");
class UpdateRefundPolicy extends (0, mapped_types_1.PartialType)(create_refundpolicy_dto_1.createRefundPolicyDto) {
}
exports.UpdateRefundPolicy = UpdateRefundPolicy;
//# sourceMappingURL=update-refundpolicy.dto.js.map
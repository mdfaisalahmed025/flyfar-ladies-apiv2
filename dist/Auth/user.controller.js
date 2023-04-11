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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./Dto/create-user.dto");
const user_service_1 = require("./user.service");
const update_user_dto_1 = require("./Dto/update-user.dto");
const auth_guard_1 = require("./auth.guard");
let UserController = class UserController {
    constructor(userServices) {
        this.userServices = userServices;
    }
    async Register(userDto, req, res) {
        const ExistUser = await this.userServices.getUserByEmail(userDto.Email);
        if (ExistUser) {
            throw new common_1.HttpException("User Already Exist,please try again with another email", common_1.HttpStatus.BAD_REQUEST);
        }
        await this.userServices.Register(userDto);
        return res.status(common_1.HttpStatus.CREATED).json({ status: "success", message: 'user register successfully' });
    }
    async login(Email, Password, req, res) {
        const token = await this.userServices.login(Email, Password);
        return res.status(common_1.HttpStatus.CREATED).json({ status: "success", message: 'user login successfully', JwtToken: token });
        ;
    }
    async verify(jwtToken) {
        const user = await this.userServices.verifyToken(jwtToken);
        return user;
    }
    async FindAll(req, res) {
        const users = await this.userServices.FindAllUser();
        return res.status(common_1.HttpStatus.OK).json({ users });
    }
    async userDashboard(id, req, res) {
        const user = await this.userServices.findUserById(id);
        return res.status(common_1.HttpStatus.OK).json({ user });
    }
    async updateUser(id, req, res, userupdatedto) {
        await this.userServices.UpdateUser(id, userupdatedto);
        return res.status(common_1.HttpStatus.OK).json({ message: 'user updated successfully' });
    }
    async Deleteuser(id, req, res) {
        await this.userServices.DeleteUser(id);
        return res.status(common_1.HttpStatus.OK).json({ message: 'user has deleted' });
    }
};
__decorate([
    (0, common_1.Post)('Register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "Register", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)('Email')),
    __param(1, (0, common_1.Body)('Password')),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('verify'),
    __param(0, (0, common_1.Body)('jwtToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verify", null);
__decorate([
    (0, common_1.Get)('Alluser'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "FindAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "userDashboard", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, update_user_dto_1.updateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "Deleteuser", null);
UserController = __decorate([
    (0, common_1.Controller)('Users'),
    __metadata("design:paramtypes", [user_service_1.UserServices])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map
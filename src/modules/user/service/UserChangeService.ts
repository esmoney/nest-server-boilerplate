import RoleRetireveService from "../../role/service/RoleRetireveService";
import { User } from "../entity/User";
import UserRequest from "../api/dto/UserRequest";
import UserRetireveService from "./UserRetireveService";
import { UserService } from "./UserService";
import { UserResponse } from "../api/dto/UserResponse";
import { Role } from "modules/role/entity/Role";
import { Equal, DeleteResult, In } from "typeorm";
import { Injectable } from "@nestjs/common";
import UserDuplicateException from "../infrastructure/exception/UserDuplicateException";
import { UserError } from "common/constants/UserErrorEnum";
import { RoleService } from "modules/role/service/RoleService";
import * as _ from "lodash";

/**
 * 사용자 변경 서비스
 */
@Injectable()
export default class UserChangeService {
    constructor(
        public userService: UserService,
        public roleService: RoleService,
    ) { }

    /**
     * 신규 사용자를 등록한다.
     * 
     * @param req 요청객체
     */
    async createUser(req: UserRequest): Promise<void> {
        // 동일한 사용자가 존재한다면...
        if ((await this.userService.isDup(req.userId))) {
            throw new UserDuplicateException(UserError.USER002, req.userId);
        }

        // 신규 사용자와 역할을 생성한다.
        const userRoles: Role[] = (_.isUndefined(req.roleIds) || _.isEmpty(req.roleIds)) ? [] : await this.roleService.getList({ roleId: In(req.roleIds) });
        const user: User = new User(req.userId, req.userNm, req.userPwd, req.userPhone, req.userDiv, req.userMajor, req.userUseYn, userRoles);

        await this.userService.create(user);
    }

    /**
     * 특정 사용자를 수정한다.
     * 
     * @param userId 사용자식별자
     * @param req 요청객체
     */
    async updateUser(userId: string, req: UserRequest): Promise<void> {
        // 동일한 사용자가 존재한다면...
        if (userId !== req.userId && (await this.userService.isDup(req.userId))) {
            throw new UserDuplicateException(UserError.USER002, req.userId);
        }

        const user = await this.userService.get({ userId: Equal(userId) });

        // 사용자와 역할을 변경한다.
        const userRoles: Role[] = (_.isUndefined(req.roleIds) || _.isEmpty(req.roleIds)) ? [] : await this.roleService.getList({ roleId: In(req.roleIds) });
        user.modifyUser(req.userId, req.userNm, req.userPwd, req.userPhone, req.userDiv, req.userMajor, req.userUseYn, userRoles);

        await this.userService.save(user);
    }

    /**
     * 특정 사용자를 삭제한다.
     * 
     * @param user 사용자
     */
    async deleteUser(userId: string): Promise<void> {
        await this.userService.delete({ userId: Equal(userId) });
    }
}
import { ApiProperty } from "@nestjs/swagger";

export default class UserRequest {
    // 사용자 아이디
    @ApiProperty()
    userId: string;
    // 사용자명
    @ApiProperty()
    userNm: string;
    // 비밀번호
    @ApiProperty()
    userPwd: string;
    // 연락처
    @ApiProperty()
    userPhone: string;
    // 사용자구분
    @ApiProperty()
    userDiv: string;
    // 사용자분과
    @ApiProperty()
    userMajor: string;
    // 사용여부
    @ApiProperty()
    userUseYn: string;
    // 역할목록
    @ApiProperty()
    roleIds: string[];

    /**
     * 생성자
     * 
     * @param userId 사용자 아이디
     * @param userNm 사용자명 
     * @param userPwd 비밀번호 
     * @param userPhone 연락처 
     * @param userDiv 사용자구분 
     * @param userMajor 사용자분과 
     * @param userUseYn 사용여부 
     * @param roleIds 역할식별자목록 
     */
    constructor(userId: string, userNm: string, userPwd: string, userPhone: string, userDiv: string, userMajor: string, userUseYn: string, roleIds: string[]) {
        this.userId = userId;
        this.userNm = userNm;
        this.userPwd = userPwd;
        this.userPhone = userPhone;
        this.userDiv = userDiv;
        this.userMajor = userMajor;
        this.userUseYn = userUseYn;
        this.roleIds = roleIds;
    }
}
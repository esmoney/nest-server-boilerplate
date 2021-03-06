import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiTags, ApiResponse } from "@nestjs/swagger";
import { AuthService } from "./AuthService";
import { AuthRequest } from "./dto/AuthRequest";
import { AuthResponse } from "./dto/AuthResponse";

/**
 * 인증 컨트롤러이다.
 */
@Controller("auth")
@ApiTags("auth")
export class AuthController {
    constructor(
        public readonly authService: AuthService
    ) { }

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ type: AuthResponse })
    async login(
        @Body() authRequest: AuthRequest,
    ): Promise<AuthResponse> {
        return await this.authService.auth(authRequest);
    }
}

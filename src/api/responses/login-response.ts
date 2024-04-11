import TokenResponse from "./token-response";
import UserResponse from "./user-response";

class LoginResponse {
    user!: UserResponse
    token!: TokenResponse;
}

export default LoginResponse;

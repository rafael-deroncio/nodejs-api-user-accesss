import { Expose } from "class-transformer";
import TokenResponse from "./token-response";

class LoginResponse {
    
    @Expose()
    token!: TokenResponse
}

export default LoginResponse;

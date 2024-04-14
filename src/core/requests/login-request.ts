import { Expose } from "class-transformer";

class LoginRequest {
    @Expose()
    username!: string;
    
    @Expose()
    password!: string;
}

export default LoginRequest;

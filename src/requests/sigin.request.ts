import { Expose } from "class-transformer";
import UserRequest from "./user.request";

class SigninRequest {
    
    @Expose()
    email!: string;

    @Expose()
    password!: string;

    user!: UserRequest;
}

export default SigninRequest;

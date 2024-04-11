import UserResponse from "./user-response";

class SigninResponse {
    user!: UserResponse;
    success!: boolean;
    messages!: string[]
}

export default SigninResponse;

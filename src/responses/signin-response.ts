import AccountResponse from "./account-response";

class SigninResponse {
    account!: AccountResponse;
    success!: boolean;
    messages!: string[]
}

export default SigninResponse;

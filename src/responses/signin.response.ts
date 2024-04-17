import { Expose } from "class-transformer";
import AccountResponse from "./account.response";

class SigninResponse {

    @Expose()
    active!: boolean;

    @Expose()
    messages!: string[];

    @Expose()
    account!: AccountResponse;
}

export default SigninResponse;

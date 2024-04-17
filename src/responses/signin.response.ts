import { Expose } from "class-transformer";
import AccountResponse from "./account.response";

class SigninResponse {

    @Expose()
    messages!: string[];

    @Expose()
    account!: AccountResponse;
}

export default SigninResponse;

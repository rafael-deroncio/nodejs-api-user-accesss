import { Expose } from "class-transformer";
import UserResponse from "./user.response";

class AccountResponse {

    @Expose()
    username!: string;

    @Expose()
    email!: string;

    @Expose()
    role!: string;

    @Expose()
    user!: UserResponse;
}

export default AccountResponse;

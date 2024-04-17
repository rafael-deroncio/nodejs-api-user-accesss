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
    active!: boolean

    @Expose()
    user!: UserResponse;
}

export default AccountResponse;

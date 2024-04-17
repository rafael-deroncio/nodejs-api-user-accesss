import { Expose } from "class-transformer";
import UserResponse from "./user.response";
import AccountDTO from "../configurations/dtos/account.dto";

class AccountResponse implements Omit<AccountDTO, 'password' | 'user' | 'role' | 'id' | 'created' | 'updated'> {

    @Expose()
    username!: string;

    @Expose()
    email!: string;

    @Expose()
    active!: boolean;

    @Expose()
    role!: string;

    @Expose()
    user!: UserResponse;
}

export default AccountResponse;

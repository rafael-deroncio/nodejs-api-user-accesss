import { Expose } from "class-transformer";
import AccountDTO from "../configurations/dtos/account.dto";
import UserRequest from "./user.request";

class AccountRequest implements Omit<AccountDTO, 'username' | 'active' | 'user' | 'role' | 'id' | 'created' | 'updated'> {

    @Expose()
    email!: string;

    @Expose()
    password!: string;

    @Expose()
    user!: UserRequest;
}

export default AccountRequest;

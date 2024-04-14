import { Expose } from "class-transformer";
import UserArgument from "./user-argument";
import RoleArgument from "./role-argument";

class AccountArgument {

    @Expose()
    username!: string;

    @Expose()
    email!: string;

    @Expose()
    password!: string;

    @Expose()
    user!: UserArgument;

    @Expose()
    role!: RoleArgument
}

export default AccountArgument;

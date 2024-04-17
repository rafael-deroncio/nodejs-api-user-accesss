import { Expose } from "class-transformer";
import RoleDTO from "./role.dto";
import UserDTO from "./user.dto";

class AccountDTO {

    @Expose()
    id!: number;

    @Expose()
    username!: string;

    @Expose()
    email!: string;

    @Expose()
    password!: string;

    @Expose()
    active!: boolean;

    @Expose()
    created!: Date;

    @Expose()
    updated!: Date;

    @Expose()
    user!: UserDTO;

    @Expose()
    role!: RoleDTO;
}

export default AccountDTO;

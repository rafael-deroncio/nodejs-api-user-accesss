import { Expose } from "class-transformer";
import AddressDTO from "./address-dto";
import RoleDTO from "./role-dto";
import TelephoneDTO from "./telephone-dto";
import AccountDTO from "./account-dto";

class UserDTO {
    @Expose()
    id!: number;

    @Expose()
    name!: string;

    @Expose()
    birthDate!: Date;

    @Expose()
    sex!: string;

    @Expose()
    created!: Date;

    @Expose()
    updated!: Date;

    @Expose()
    role!: RoleDTO;

    @Expose()
    account!: AccountDTO;

    @Expose()
    addresses!: AddressDTO[];

    @Expose()
    telephones!: TelephoneDTO[];
}

export default UserDTO;

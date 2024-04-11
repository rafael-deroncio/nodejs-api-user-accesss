import { Expose } from "class-transformer";
import AccessDTO from "./access-dto";
import AddressDTO from "./address-dto";
import CredentialDTO from "./credential-dto";
import RoleDTO from "./role-dto";
import TelephoneDTO from "./telephone-dto";

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
    active!: boolean;

    @Expose()
    created!: Date;

    @Expose()
    updated!: Date;

    @Expose()
    role!: RoleDTO;

    @Expose()
    credential!: CredentialDTO;

    @Expose()
    addresses!: AddressDTO[];

    @Expose()
    telephones!: TelephoneDTO[];

    @Expose()
    accesses!: AccessDTO[];
}

export default UserDTO;

import { Expose } from "class-transformer";
import AddressArgument from "./address-argument";
import TelephoneArgument from "./telephone-argument";
import RoleArgument from "./role-argument";
import CredentialArgument from "./credential-argument";

class UserArgument {
    @Expose()
    name!: string;

    @Expose()
    birthDate!: Date;

    @Expose()
    sex!: string;

    @Expose()
    picture?: string;

    @Expose()
    credential!: CredentialArgument;

    @Expose()
    addresses!: AddressArgument[];

    @Expose()
    telephones!: TelephoneArgument[];

    @Expose()
    role!: RoleArgument;

    @Expose()
    active!: boolean;
}

export default UserArgument;

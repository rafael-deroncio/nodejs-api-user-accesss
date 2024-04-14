import { Expose } from "class-transformer";
import AddressArgument from "./address-argument";
import TelephoneArgument from "./telephone-argument";

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
    addresses!: AddressArgument[];

    @Expose()
    telephones!: TelephoneArgument[];
}

export default UserArgument;

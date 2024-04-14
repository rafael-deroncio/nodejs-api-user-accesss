import { Expose } from "class-transformer";
import AddressDTO from "./address-dto";
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
    created!: Date;

    @Expose()
    updated!: Date;

    @Expose()
    addresses!: AddressDTO[];

    @Expose()
    telephones!: TelephoneDTO[];
}

export default UserDTO;

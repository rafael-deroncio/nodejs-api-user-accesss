import { Expose } from "class-transformer";
import AddressDTO from "./address.dto";
import TelephoneDTO from "./telephone.dto";

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
    picture?: string;

    @Expose()
    created!: Date;

    @Expose()
    updated!: Date;

    @Expose()
    addresses!: Array<AddressDTO>;

    @Expose()
    telephones!: Array<TelephoneDTO>;
}

export default UserDTO;

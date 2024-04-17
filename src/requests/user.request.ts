import { Expose } from "class-transformer";
import AddressRequest from "./address.rerquest";
import TelephoneRequest from "./telephone.request";
import UserDTO from "../configurations/dtos/user.dto";

class UserRequest implements Omit<UserDTO, 'name' | 'addresses' | 'telephones' | 'id' | 'created' | 'updated'> {

    @Expose()
    firstName!: string;

    @Expose()
    lastName!: string;

    @Expose()
    birthDate!: Date;

    @Expose()
    sex!: string;

    @Expose()
    picture?: string;

    @Expose()
    addresses!: Array<AddressRequest>;

    @Expose()
    telephones!: Array<TelephoneRequest>;
}

export default UserRequest;
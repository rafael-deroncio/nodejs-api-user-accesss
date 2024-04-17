import { Expose, Type } from "class-transformer";
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
    @Type(() => AddressRequest)
    addresses!: AddressRequest[];

    @Expose()
    @Type(() => TelephoneRequest)
    telephones!: TelephoneRequest[];
}

export default UserRequest;
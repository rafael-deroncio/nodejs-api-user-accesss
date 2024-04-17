import { Expose } from "class-transformer";
import AddressRequest from "./address.rerquest";
import TelephoneRequest from "./telephone.request";

class UserRequest {
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
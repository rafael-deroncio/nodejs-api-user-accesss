import { Expose } from "class-transformer";
import AddressResponse from "./address-response";
import TelephoneResponse from "./telephone-response";

class UserResponse {
    @Expose()
    name!: string;

    @Expose()
    birthDate!: Date;

    @Expose()
    sex!:string;

    @Expose()
    addresses!: AddressResponse[];

    @Expose()
    telephones!: TelephoneResponse[]
}

export default UserResponse;
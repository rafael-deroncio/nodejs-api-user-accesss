import { Expose } from "class-transformer";
import AccountResponse from "./account-response";
import AddressResponse from "./address-response";
import TelephoneResponse from "./telephone-response";

class UserAccountResponse extends AccountResponse {

    @Expose()
    name!: string;

    @Expose()
    birthDate!: Date;

    @Expose()
    sex!: string;

    @Expose()
    addresses!: AddressResponse[]

    @Expose()
    telephones!: TelephoneResponse[]
}

export default UserAccountResponse;
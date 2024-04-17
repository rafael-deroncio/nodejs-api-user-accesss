import { Expose } from "class-transformer";
import TelephoneResponse from "./telephone.response";
import AddressResponse from "./address.response";

class UserResponse {
    @Expose()
    name!: string;

    @Expose()
    sex!: string;

    @Expose()
    age!: number;

    @Expose()
    picture!: string;

    @Expose()
    telephone!: TelephoneResponse

    @Expose()
    address!: AddressResponse
}

export default UserResponse;
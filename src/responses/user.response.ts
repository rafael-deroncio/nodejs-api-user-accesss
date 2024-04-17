import { Expose } from "class-transformer";
import TelephoneResponse from "./telephone.response";
import AddressResponse from "./address.response";
import UserDTO from "../configurations/dtos/user.dto";

class UserResponse implements Omit<UserDTO, 'birthDate' | 'addresses' | 'telephones' | 'id' | 'created' | 'updated'> {
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
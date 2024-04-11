import { Expose, Transform } from "class-transformer";
import AddressResponse from "./address-response";
import TelephoneResponse from "./telephone-response";

class UserResponse {
    @Expose()
    @Transform(({ obj }) => obj.name)
    name!: string;

    @Expose()
    @Transform(({ obj }) => obj.credential.username)
    username!: string;

    @Expose()
    @Transform(({ obj }) => obj.credential.email)
    email!: string;

    @Expose()
    @Transform(({ obj }) => new Date().getFullYear() - new Date(obj.birthDate).getFullYear())
    age!: number;

    @Expose()
    addresses!: AddressResponse[];

    @Expose()
    telephones!: TelephoneResponse[]

}

export default UserResponse;
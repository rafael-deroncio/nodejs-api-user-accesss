import { Expose, Transform } from "class-transformer";
import AddressRequest from "./address-rerquest";
import TelephoneRequest from "./telephone-request";

class UserRequest {
    @Expose()
    @Transform(({ obj }) => `${obj.firstName} ${obj.lastName}`)
    name!: string;

    @Expose()
    birthDate!: Date;

    @Expose()
    sex!: string;

    @Expose()
    email!: string;

    @Expose()
    username!: string;

    @Expose()
    password!: string;

    @Expose()
    addresses!: AddressRequest[];

    @Expose()
    telephones!: TelephoneRequest[];
}

export default UserRequest;
import { Expose } from "class-transformer";
import AddressRequest from "./address-rerquest";
import TelephonesRequest from "./telephone-request";

class SiginRequest {
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
    email!: string;

    @Expose()
    password!: string;

    @Expose()
    addresses!: AddressRequest[];

    @Expose()
    telephones!: TelephonesRequest[];
}

export default SiginRequest;

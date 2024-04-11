import { Expose } from "class-transformer";

class AddressArgument {

    @Expose()
    street!: string;

    @Expose()
    number!: string;

    @Expose()
    district!: string;

    @Expose()
    city!: string;

    @Expose()
    state!: string;

    @Expose()
    country!: string;

    @Expose()
    zipcode!: string;

    @Expose()
    type!: string;

    @Expose()
    principal!: boolean;
}

export default AddressArgument;

import { Expose } from "class-transformer";

class AddressDTO {
    @Expose()
    id!: number;

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

    @Expose()
    active!: boolean;

    @Expose()
    created!: Date;

    @Expose()
    updated!: Date;
}

export default AddressDTO;

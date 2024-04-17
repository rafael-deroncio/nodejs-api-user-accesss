import { Expose } from "class-transformer";

class TelephoneDTO {

    @Expose()
    id!: number

    @Expose()
    number!: string;

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

export default TelephoneDTO;

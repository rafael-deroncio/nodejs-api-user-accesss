import { Expose } from "class-transformer";

class TelephoneRequest {
    @Expose()
    number!: string;

    @Expose()
    type!: string;

    @Expose()
    principal!: boolean;
}

export default TelephoneRequest;

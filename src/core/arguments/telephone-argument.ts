import { Expose } from "class-transformer";

class TelephoneArgument {
    @Expose()
    number!: string;

    @Expose()
    type!: string;

    @Expose()
    principal!: boolean;
}

export default TelephoneArgument;

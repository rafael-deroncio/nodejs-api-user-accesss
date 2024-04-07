import { Expose } from "class-transformer";

class TelephonesRequest {
    @Expose()
    number!: string;

    @Expose()
    type!: string;

    @Expose()
    principal!: boolean;
}

export default TelephonesRequest;

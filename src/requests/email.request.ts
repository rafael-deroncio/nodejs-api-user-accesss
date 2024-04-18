import { Expose } from "class-transformer";

class EmailRequest {

    @Expose()
    to!: string;

    @Expose()
    subject!: string;

    @Expose()
    bodyParms!: string[]
}

export default EmailRequest;

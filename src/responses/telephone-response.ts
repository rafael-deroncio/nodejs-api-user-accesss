import { Expose } from "class-transformer";

class TelephoneResponse {
    @Expose()
    number!: string;
    
    @Expose()
    type!: string;
    
    @Expose()
    principal!: boolean;
}

export default TelephoneResponse;

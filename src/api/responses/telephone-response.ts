import { Expose } from "class-transformer";

class TelephoneResponse {
    @Expose()
    phone!: string;
    
    @Expose()
    type!: string;
    
    @Expose()
    principal!: boolean;
}

export default TelephoneResponse;

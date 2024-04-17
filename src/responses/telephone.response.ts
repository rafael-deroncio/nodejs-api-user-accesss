import { Expose } from "class-transformer";
import TelephoneDTO from "../configurations/dtos/telephone.dto";

class TelephoneResponse implements Omit<TelephoneDTO, 'active' | 'id' | 'created' | 'updated'> {
    @Expose()
    number!: string;
    
    @Expose()
    type!: string;
    
    @Expose()
    principal!: boolean;
}

export default TelephoneResponse;

import { Expose } from "class-transformer";

class ConfirmAccountResponse {
    
    @Expose()
    active!: boolean;
    
    @Expose()
    messages!: Array<string>;
}

export default ConfirmAccountResponse
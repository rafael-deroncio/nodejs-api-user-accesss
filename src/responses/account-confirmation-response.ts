import { Expose } from "class-transformer";

class AccountConfirmationResponse {
    @Expose()
    status!: string;
    
    @Expose()
    username!: string;

    @Expose()
    email!: string;
}

export default AccountConfirmationResponse;

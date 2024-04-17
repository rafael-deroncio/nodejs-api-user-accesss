import { Expose } from "class-transformer";

class AccountResponse {
    
    @Expose()
    username!: string;

    @Expose()
    email!: string;
    
    @Expose()
    role!: string;
}

export default AccountResponse;
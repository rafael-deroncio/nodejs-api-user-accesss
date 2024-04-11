import { Expose } from "class-transformer";

class CredentialArgument {

    @Expose()
    username!: string;

    @Expose()
    email!: string;

    @Expose()
    password!: string;
    
    @Expose()
    active!: boolean;
}

export default CredentialArgument;

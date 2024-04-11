import { Expose } from "class-transformer";

class AccessDTO {
    @Expose()
    id!: number;

    @Expose()
    username!: string;

    @Expose()
    email!: string;

    @Expose()
    password!: string;

    @Expose()
    active!: boolean;

    @Expose()
    created!: Date;

    @Expose()
    updated!: Date;
}

export default AccessDTO;

import { Expose } from "class-transformer";

class RoleArgument {

    @Expose()
    id!: number;

    @Expose()
    role!: string;
}

export default RoleArgument;

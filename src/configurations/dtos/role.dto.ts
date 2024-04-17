import { Expose } from "class-transformer";

class RoleDTO {
    @Expose()
    id!: number;

    @Expose()
    role!: string;

    @Expose()
    created!: Date;

    @Expose()
    updated!: Date;
}

export default RoleDTO;

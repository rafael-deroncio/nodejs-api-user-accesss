import { Expose } from "class-transformer";
import RoleType from "../configurations/enums/role.type.enum";

class TokenPayloadRequest {

    @Expose()
    username!: string;

    @Expose()
    email!: string;

    @Expose()
    role!: RoleType;
}

export default TokenPayloadRequest;

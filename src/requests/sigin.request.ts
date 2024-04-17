import { Expose } from "class-transformer";
import UserRequest from "./user.request";

class SiginRequest {
    @Expose()
    email!: string;

    @Expose()
    password!: string;

    user!: UserRequest;
}

export default SiginRequest;

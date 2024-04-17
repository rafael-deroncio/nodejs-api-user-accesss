import { Expose } from "class-transformer";

class UserResponse {
    @Expose()
    name!: string;
}

export default UserResponse;
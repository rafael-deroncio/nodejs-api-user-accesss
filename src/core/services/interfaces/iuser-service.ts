import UserRequest from "../../requests/user-request";
import UserResponse from "../../responses/user-response";

interface IUserService {
    createUSer(request: UserRequest): Promise<UserResponse>

    emailExists(email: string): Promise<boolean>
    activateUser(email: string): Promise<boolean>
}

export default IUserService;

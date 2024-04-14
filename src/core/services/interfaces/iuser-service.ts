import UserRequest from "../../../api/requests/user-request";
import UserResponse from "../../../api/responses/user-response";

interface IUserService {
    createUSer(request: UserRequest): Promise<UserResponse>

    emailExists(email: string): Promise<boolean>
    activateUser(email: string): Promise<boolean>
}

export default IUserService;

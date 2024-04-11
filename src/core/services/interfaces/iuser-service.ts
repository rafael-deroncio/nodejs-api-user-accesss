import UserRequest from "../../../api/requests/user-request";
import UserResponse from "../../../api/responses/user-response";

interface IUserService {
    emailExists(email: string): Promise<boolean>
    
    createUSer(request: UserRequest): Promise<UserResponse>
}

export default IUserService;

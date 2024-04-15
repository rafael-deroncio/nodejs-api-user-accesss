import UserRequest from "../../requests/user-request";
import UserResponse from "../../responses/user-response";

interface IUserService {
    getUser(username: string): Promise<UserResponse>
    getUsers(username: string): Promise<UserResponse[]>
    updateUser(username: string, request: UserRequest): Promise<UserResponse[]>
}

export default IUserService;

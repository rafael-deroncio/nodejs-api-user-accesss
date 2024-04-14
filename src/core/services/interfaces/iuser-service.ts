import UserResponse from "../../responses/user-response";

interface IUserService {
    getUserByEmalil(email: string): Promise<UserResponse>
}

export default IUserService;

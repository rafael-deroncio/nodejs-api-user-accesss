import UserArgument from "../../arguments/user-argument";
import UserModel from "../../models/user-model";

interface IUserRepository {
    getUser(): Promise<UserModel | null>;
    getUsers(): Promise<UserModel[] | null>
    getUserByEmail(email: string): Promise<UserModel | null>;
    createUser(argument: UserArgument): Promise<UserModel | null>
    updateUser(): Promise<UserModel | null>
    deleteUser(): Promise<boolean>

    getSequence(): Promise<number | null>
}

export default IUserRepository;

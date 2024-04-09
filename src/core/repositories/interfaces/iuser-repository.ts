import UserEntity from "../../configurations/entities/user-entity";

interface IUserRepository {
    getuser(): Promise<UserEntity | null>;
    getUsers(): Promise<UserEntity[] | null>
    createUser(): Promise<UserEntity | null>
    updateUser(): Promise<UserEntity | null>
    deleteUser(): Promise<boolean>
}

export default IUserRepository;

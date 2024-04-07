interface IUserRepository {
    getuser(): Promise<void>;
    getUsers(): Promise<void>
    createUser(): Promise<void>
    updateUser(): Promise<void>
    deleteUser(): Promise<void>
}

export default IUserRepository;
 
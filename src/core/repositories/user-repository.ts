import BaseRepository from "./base-repository";
import IUserRepository from "./interfaces/iuser-repository";
import UserEntity from "../configurations/entities/user-entity";
import Mapper from "../configurations/mapper";
import IMapper from "../configurations/interfaces/imapper";
import UserModel from "../models/user-model";
import UserArgument from "../arguments/user-argument";
import DatabaseException from "../exceptions/database-exception";

class UserRepository extends BaseRepository<UserEntity> implements IUserRepository {

    private static _instance: IUserRepository;
    private _mapper: IMapper;

    static instance(): IUserRepository {
        if (!this._instance) this._instance = new UserRepository();
        return this._instance
    }

    private constructor() {
        super(UserEntity);
        this._mapper = Mapper.instance();
    }

    override async getSequence(): Promise<number | null> {
        try {
            const result = await this.connection()
                .query(`select seq from sqlite_sequence where name = 'users'`);
            return result?.[0]?.seq ?? null;
        } catch (error) {
            console.error("Error getting sequebce:", error);
            return null;
        }
    }

    async getUser(): Promise<UserModel | null> {
        throw new Error("Method not implemented.");
    }

    getUsers(): Promise<UserModel[] | null> {
        throw new Error("Method not implemented.");
    }

    async getUserByEmail(email: string): Promise<UserModel | null> {
        try {
            const user: UserEntity | null = await this.connection()
                .createQueryBuilder("users")
                .leftJoinAndSelect("users.role", "role")
                .leftJoinAndSelect("users.credential", "credential")
                .leftJoinAndSelect("users.addresses", "addresses")
                .leftJoinAndSelect("users.telephones", "telephones")
                .where("credential.email = :email", { email: email })
                .getOne();

            return this._mapper.map(user, UserModel)
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async createUser(argument: UserArgument): Promise<UserModel | null> {
        try {
            await this.start();
            const user: UserEntity = await this.connection()
                .save(this._mapper.map(argument, UserEntity));
            await this.commit();

            if (user) return this._mapper.map(user, UserModel);
            throw new DatabaseException('Erro ao registrar Usuário.')
        } catch (error) {
            console.error(error);
            this.rollback();
            if (error instanceof DatabaseException)
                throw new DatabaseException(error.title);
            throw error
        }
    }

    updateUser(): Promise<UserModel | null> {
        throw new Error("Method not implemented.");
    }

    deleteUser(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }




}

export default UserRepository;
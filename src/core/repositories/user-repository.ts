import typeorm from "../configurations/typeorm";
import BaseRepository from "./base-repository";
import IUserRepository from "./interfaces/iuser-repository";
import UserEntity from "../configurations/entities/user-entity";
import DatabaseException from "../exceptions/database-exception";
import { DeleteResult } from "typeorm";

class UserRepository extends BaseRepository<UserEntity> implements IUserRepository {

    private static _instance: IUserRepository;

    private constructor() {
        super(typeorm.options, UserEntity);
    }

    static instance(): IUserRepository {
        if (!this._instance) this._instance = new UserRepository();
        return this._instance
    }

    async getuser(): Promise<UserEntity | null> {
        try {
            return await this.repository().findOne({});
        } catch (error) {
            console.error(`Error getting user. ${error}`);
            throw new DatabaseException();
        }
    }

    async getUsers(): Promise<UserEntity[]> {
        try {
            return await this.repository()
                .createQueryBuilder()
                .limit(10)
                .skip(5)
                .getMany();
        } catch (error) {
            console.error(`Error getting users. ${error}`);
            throw new DatabaseException();
        }
    }

    async createUser(): Promise<UserEntity | null> {
        try {
            this.start();
            const user: UserEntity = await this.repository().create({})
            this.commit();
            return user;
        } catch (error) {
            console.error(`Error create user. ${error}`);
            this.rollback();
            throw new DatabaseException();
        } finally {
            await this.release();
        }
    }

    async updateUser(): Promise<UserEntity | null> {
        try {
            this.start();
            const user: UserEntity = await this.repository().save({})
            this.commit();
            return user;
        } catch (error) {
            console.error(`Error update user. ${error}`);
            this.rollback();
            throw new DatabaseException();
        } finally {
            await this.release();
        }
    }

    async deleteUser(): Promise<boolean> {
        try {
            this.start();
            const result: DeleteResult = await await this.repository().delete({})
            this.commit();
            return !!result.affected;
        } catch (error) {
            console.error(`Error delete user. ${error}`);
            this.rollback();
            throw new DatabaseException();
        } finally {
            await this.release();
        }
    }

}

export default UserRepository;
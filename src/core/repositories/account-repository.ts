import BaseRepository from "./base-repository";
import Mapper from "../configurations/mapper";
import IMapper from "../configurations/interfaces/imapper";
import IAccountRepository from "./interfaces/iaccount-repository";
import AccountEntity from "../configurations/entities/account-entity";
import AccountArgument from "../arguments/account-argument";
import AccountModel from "../models/account-model";
import DatabaseException from "../exceptions/database-exception";
import { UpdateResult } from "typeorm";

class AccountRepository extends BaseRepository<AccountEntity> implements IAccountRepository {

    private static _instance: IAccountRepository;
    private _mapper: IMapper;

    static instance(): IAccountRepository {
        if (!this._instance) this._instance = new AccountRepository();
        return this._instance
    }

    private constructor() {
        super(AccountEntity);
        this._mapper = Mapper.instance();
    }

    override async getSequence(): Promise<number | null> {
        try {
            const result = await this.connection()
                .createQueryBuilder("account")
                .select("MAX(account.id)", "maxId")
                .getRawOne();

            return result?.maxId ?? null;
        } catch (error) {
            console.error("Error getting sequebce:", error);
            return null;
        }
    }

    async emailExists(email: string): Promise<boolean> {
        return await await this.connection()
            .createQueryBuilder("account")
            .where("account.email = :email", { email })
            .getCount() > 0;
    }

    async createAccount(argument: AccountArgument): Promise<AccountModel> {
        try {
            await this.start();
            const account: AccountEntity = await this.connection().save({ ...argument });
            await this.commit();
            if (account) return this._mapper.map(account, AccountModel);
            throw new DatabaseException('Erro ao registrar Usuário.')
        } catch (error) {
            await this.rollback();
            console.error(error);
            throw error
        }
    }

    async getAccount(username: string): Promise<AccountModel> {
        try {
            const account: AccountEntity | null = await this.connection().findOne({
                where: { username }
            });
            
            console.log(account);
            
            return this._mapper.map(account, AccountModel);
        } catch (error) {
            await this.rollback();
            console.error(error);
            throw error
        }
    }

    async activeAccount(email: string): Promise<boolean> {
        try {
            await this.start();
            const result: UpdateResult = await this.connection()
                .createQueryBuilder()
                .update()
                .set({ active: true })
                .where("email = :email", { email })
                .execute();
            await this.commit();
            return result.affected ? result.affected > 0 : false;
        } catch (error) {
            await this.rollback();
            console.error(error);
            throw new DatabaseException('Erro ao ativar o usuário.');
        }
    }
}

export default AccountRepository;
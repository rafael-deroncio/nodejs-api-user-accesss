import AccountEntity from "../configurations/entities/account.entity";
import AccountArgument from "../arguments/account.argument";
import AccountModel from "../models/account.model";
import IMapper from "../configurations/interfaces/imapper";
import Mapper from "../configurations/mapper";
import BaseRepository from "./base.repository";
import IAccountRepository from "./interfaces/iaccount.repositroy";
import PaginationArgument from "../arguments/pagination.argument";
import DatabaseException from "../exceptions/database.exception";

class AccountRepository extends BaseRepository<AccountEntity> implements IAccountRepository {

    //#region dependencies
    private _mapper: IMapper;
    //#endregion

    //#region singleton
    private static _instance: IAccountRepository;

    protected constructor() {
        super(AccountEntity)
        this._mapper = Mapper.instance();
    }

    public static instance(): IAccountRepository {
        if (!this._instance)
            this._instance = new AccountRepository();
        return this._instance
    }
    //#endregion

    public async get(username: string): Promise<AccountModel> {
        try {
            const entity: AccountEntity | null = await this.connection()
                .createQueryBuilder('account')
                .leftJoinAndSelect('account.user', 'user')
                .leftJoinAndSelect('account.role', 'role')
                .leftJoinAndSelect('user.addresses', 'addresses')
                .leftJoinAndSelect('user.telephones', 'telephones')
                .where('account.username = :username', { username })
                .orWhere('account.email = :email', { email: username })
                .getOne()

            return this._mapper.map(entity, AccountModel);
        } catch (error) {
            console.log(error);
            throw new DatabaseException()
        }
    }

    paged(argument: PaginationArgument): Promise<AccountModel[]> {
        try {
            argument
            throw new Error("Method not implemented.");
        } catch (error) {
            console.log(error);
            throw new DatabaseException()
        }
    }
    public async create(argument: AccountArgument): Promise<AccountModel> {
        try {
            this.start();
            const entity: AccountEntity = await this.connection().save({ ...argument })
            this.commit();
            return this._mapper.map(entity, AccountModel);
        } catch (error) {
            this.rollback();
            console.log(error);
            throw new DatabaseException();
        }
    }

    update(username: string, argument: AccountArgument): Promise<AccountModel> {
        try {
            username; argument
            throw new Error("Method not implemented.");
        } catch (error) {
            console.log(error);
            throw new DatabaseException()
        }
    }

    delete(username: string): Promise<boolean> {
        try {
            username
            throw new Error("Method not implemented.");
        } catch (error) {
            console.log(error);
            throw new DatabaseException()
        }
    }

    public async sequence(): Promise<number> {
        try {
            const result = await this.connection()
                .createQueryBuilder("account")
                .select("MAX(account.id)", "maxId")
                .getRawOne();
            return result?.maxId
        } catch (error) {
            console.error("Error getting sequebce:", error);
            throw new DatabaseException();
        }
    }
}

export default AccountRepository;

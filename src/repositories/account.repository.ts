import AccountEntity from "../configurations/entities/account.entity";
import AccountArgument from "../arguments/account.argument";
import AccountModel from "../models/account.model";
import IMapper from "../configurations/interfaces/imapper";
import Mapper from "../configurations/mapper";
import BaseRepository from "./base.repository";
import IAccountRepository from "./interfaces/iaccount.repositroy";
import PaginationArgument from "../arguments/pagination.argument";

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

    get(username: string): Promise<AccountModel> {
        username
        throw new Error("Method not implemented.");
    }

    paged(argument: PaginationArgument): Promise<AccountModel[]> {
        argument
        throw new Error("Method not implemented.");
    }

    create(argument: AccountArgument): Promise<AccountModel> {
        argument
        throw new Error("Method not implemented.");
    }

    update(username: string): Promise<AccountModel> {
        username
        throw new Error("Method not implemented.");
    }
    
    delete(username: string): Promise<boolean> {
        username
        throw new Error("Method not implemented.");
    }
}

export default AccountRepository;

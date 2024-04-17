import AccountArgument from "../../arguments/account.argument"
import AccountModel from "../../models/account.model"

interface IAccountRepository {
    get(username: string): Promise<AccountModel>
    paged(argument: PaginationArgument): Promise<Array<AccountModel>>
    create(argument: AccountArgument): Promise<AccountModel>
    update(username: string): Promise<AccountModel>
    delete(username: string): Promise<boolean>
}

export default IAccountRepository;

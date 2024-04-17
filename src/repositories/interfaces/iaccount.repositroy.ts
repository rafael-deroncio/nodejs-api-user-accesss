import AccountArgument from "../../arguments/account.argument"
import PaginationArgument from "../../arguments/pagination.argument"
import AccountModel from "../../models/account.model"

interface IAccountRepository {
    get(username: string): Promise<AccountModel>
    paged(argument: PaginationArgument): Promise<Array<AccountModel>>
    create(argument: AccountArgument): Promise<AccountModel>
    update(username: string, argument: AccountArgument): Promise<AccountModel>
    delete(username: string): Promise<boolean>
    sequence(): Promise<number>
}

export default IAccountRepository;

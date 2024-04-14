import AccountArgument from "../../arguments/account-argument";
import AccountModel from "../../models/account-model";

interface IAccountRepository {
    getAccount(username: string): Promise<AccountModel>
    createAccount(argument: AccountArgument): Promise<AccountModel>

    emailExists(email: string): Promise<boolean>
    activeAccount(email: string): Promise<boolean>

    getSequence(): Promise<number | null>
}

export default IAccountRepository;

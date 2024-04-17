import { StatusCodes } from "http-status-codes";
import AccountArgument from "../arguments/account.argument";
import AddressArgument from "../arguments/address.argument";
import RoleArgument from "../arguments/role.argument";
import TelephoneArgument from "../arguments/telephone.argument";
import RoleType from "../configurations/enums/role.type.enum";
import IMapper from "../configurations/interfaces/imapper";
import Mapper from "../configurations/mapper";
import AccountExeption from "../exceptions/account.exception";
import TokenExeption from "../exceptions/token-exception";
import { picture } from "../helpers/image.helper";
import { str } from "../helpers/string.helpper";
import AccountModel from "../models/account.model";
import AccountRepository from "../repositories/account.repository";
import IAccountRepository from "../repositories/interfaces/iaccount.repositroy";
import LoginRequest from "../requests/login.request";
import SigninRequest from "../requests/sigin.request";
import AccountResponse from "../responses/account.response";
import ConfirmAccountResponse from "../responses/confirm.account.response";
import LoginResponse from "../responses/login.response";
import SigninResponse from "../responses/signin.response";
import IAccountService from "./interfaces/iaccount.service";
import ITokenService from "./interfaces/itoken.service";
import TokenService from "./token.service";
import DatabaseException from "../exceptions/database.exception";

class AccountService implements IAccountService {

    //#region dependencies
    private _mapper: IMapper;
    private _service: ITokenService;
    private _repository: IAccountRepository
    //#endregion

    //#region singleton
    private static _instance: IAccountService;

    protected constructor() {
        this._mapper = Mapper.instance();
        this._service = TokenService.instance();
        this._repository = AccountRepository.instance();
    }

    public static instance(): IAccountService {
        if (!this._instance)
            this._instance = new AccountService();
        return this._instance
    }
    //#endregion

    public async signin(request: SigninRequest): Promise<SigninResponse> {
        try {

            request.email = request.email.trim().toLowerCase();
            if (await this._repository.get(request.email))
                throw new AccountExeption(
                    'Email in use!',
                    ['Email provided is already being used on another account.', 'Try using another email address.']);

            const argument: AccountArgument = this._mapper.map(request, AccountArgument);

            // user
            argument.user.name = str.name(`${request.user.firstName} ${request.user.lastName}`);
            argument.user.picture = picture.sex(request.user.sex);

            // address
            argument.user.addresses = this._mapper.maps(request.user.addresses, AddressArgument)
                .map((address, index) => {
                    address.principal = index === 0 ? true : false;
                    address.active = true
                    return address
                });

            //telephones
            argument.user.telephones = this._mapper.maps(request.user.telephones, TelephoneArgument)
                .map((telephone, index) => {
                    telephone.principal = index === 0 ? true : false;
                    telephone.active = true
                    return telephone
                });

            // account
            argument.username = str.username(argument.user.name, await this._repository.sequence());

            // role
            argument.role = { id: RoleType.User, role: RoleType[RoleType.User] } as RoleArgument;

            // save account
            const model: AccountModel = await this._repository.create(argument);
            const account = this._mapper.map(model, AccountResponse);
            account.user.address = model.user.addresses.find(address => address.principal)!
            account.user.telephone = model.user.telephones.find(telephone => telephone.principal)!

            return {
                messages: ['Account created successfully!', `Activation email sent to ${model.email}`],
                account: account
            }
        } catch (error) {
            console.log(error);
            if (error instanceof DatabaseException)
                throw error;
            throw new AccountExeption(
                'Error saving account',
                ['We were unable to create a new account at this time!', ' Please try again later!'],
                StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    public async confirm(token: string): Promise<ConfirmAccountResponse> {

        if (!await this._service.validate(token))
            if (!token?.toString()) throw new TokenExeption(
                'Invalid token',
                ['Token provided is not valid.']);

        const payload = await this._service.decode(token);

        console.log(payload);

        throw new Error("Method not implemented.");
    }

    public async login(request: LoginRequest): Promise<LoginResponse> {
        request
        throw new Error("Method not implemented.");
    }
}

export default AccountService;

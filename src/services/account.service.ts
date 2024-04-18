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
import IEmailService from "./interfaces/iemail.service";
import EmailService from "./emailservice";
import EmailRequest from "../requests/email.request";
import TokenResponse from "../responses/token-response";
import TokenRequest from "../requests/token.request";
import TokenType from "../configurations/enums/token.type.enum";
import config from "../config";
import BaseException from "../exceptions/base.exception";
import AddressResponse from "../responses/address.response";
import TelephoneResponse from "../responses/telephone.response";
import TokenPayloadRequest from "../requests/token.payload.request";

class AccountService implements IAccountService {

    //#region dependencies
    private _mapper: IMapper;
    private _token: ITokenService;
    private _email: IEmailService;
    private _repository: IAccountRepository
    //#endregion

    //#region singleton
    private static _instance: IAccountService;

    protected constructor() {
        this._mapper = Mapper.instance();
        this._token = TokenService.instance();
        this._email = EmailService.instance();
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

            account.user.address = this._mapper.map(
                model.user.addresses.find(address => address.principal)!,
                AddressResponse);

            account.user.telephone = this._mapper.map(
                model.user.telephones.find(telephone => telephone.principal)!,
                TelephoneResponse);

            //token
            const tokenRequest: TokenRequest = {
                type: TokenType.Confirmation,
                payload: {
                    username: model.username,
                    email: model.email,
                    role: model.role.id as RoleType
                }
            }
            const tokenResponse: TokenResponse = await this._token.generate(tokenRequest);

            //url
            const url: string =
                `http://${config.server.host}:${config.server.port}/account/confirm?token=${tokenResponse.value}`;

            // email
            const message: EmailRequest = {
                to: model.email,
                subject: 'Nodestore | Confirm account',
                bodyParms: [model.user.name, url]
            };
            await this._email.send('account-confirmation', message);

            return {
                messages: ['Account created successfully!', `Activation email sent to ${model.email}`],
                account: account
            }
        } catch (error) {
            console.log(error);
            if (error instanceof BaseException)
                throw error;

            throw new AccountExeption(
                'Error saving account',
                ['We were unable to create a new account at this time!', 'Please try again later!'],
                StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    public async confirm(token: string): Promise<ConfirmAccountResponse> {
        try {
            if (!await this._token.validate(token))
                if (!token?.toString()) throw new TokenExeption(
                    'Invalid token',
                    ['Token provided is not valid.'],
                    StatusCodes.BAD_REQUEST);

            const payload: TokenPayloadRequest = this._mapper.map(await this._token.decode(token), TokenPayloadRequest);

            const model: AccountModel = await this._repository.get(payload.username);

            if (!model)
                throw new AccountExeption(
                    'Account not found!',
                    ['No account was found for the data entered.'],
                    StatusCodes.NOT_FOUND);

            model.active = true;
            await this._repository.update(
                payload.username, this._mapper.map(model, AccountArgument));

            // email
            const message: EmailRequest = {
                to: model.email,
                subject: 'Nodestore | Account activated',
                bodyParms: [model.user.name, model.username]
            };
            await this._email.send('account-confirmation-success', message);

            return {
                active: true,
                messages: [
                    'Account activated.',
                    'Email confirming activation sent.',
                    'Login enabled.'
                ]
            }
        } catch (error) {
            console.log(error);
            if (error instanceof BaseException)
                throw error;

            throw new AccountExeption(
                'Error activating account.',
                ['Unable to activate account at this time!', 'Please try again later!'],
                StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }

    public async login(request: LoginRequest): Promise<LoginResponse> {
        try {

            console.log(request);
            

            const model: AccountModel = await this._repository.get(request.username);

            if (!model)
                throw new AccountExeption(
                    'Account not found!',
                    ['No account was found for the data entered.'],
                    StatusCodes.UNAUTHORIZED);
                    
            if (!model.active)
                throw new AccountExeption(
                    'Inactive account!',
                    ['Pending account confirmation.'],
                    StatusCodes.UNAUTHORIZED);

                    console.log(model.password, request.password);
                    

            if (model.password !== request.password)
                throw new AccountExeption(
                    'Invalid data!',
                    ['Review the input information and try again.'],
                    StatusCodes.UNAUTHORIZED);

            //token
            const tokenRequest: TokenRequest = {
                type: TokenType.Access,
                payload: {
                    username: model.username,
                    email: model.email,
                    role: model.role.id as RoleType
                }
            }

            return { token: await this._token.generate(tokenRequest) }
        } catch (error) {
            console.log(error);
            if (error instanceof BaseException)
                throw error;

            throw new AccountExeption(
                'Error logging into account.',
                ['Unable to log into account at this time!', 'Try again later!'],
                StatusCodes.INTERNAL_SERVER_ERROR);
        }
    }
}

export default AccountService;

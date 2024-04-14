import { JwtPayload } from "jsonwebtoken";
import LoginRequest from "../requests/login-request";
import SiginRequest from "../requests/sigin-request";
import AccountConfirmationResponse from "../responses/account-confirmation-response";
import LoginResponse from "../responses/login-response";
import SigninResponse from "../responses/signin-response";
import IMapper from "../configurations/interfaces/imapper";
import Mapper from "../configurations/mapper";
import AccountExeption from "../exceptions/account-exception";
import EmailService from "./email-service";
import IAccountService from "./interfaces/iaccount-service";
import IEmailService from "./interfaces/iemail-service";
import ITokenService from "./interfaces/itoken-service";
import TokenService from "./token-service";
import AccountArgument from "../arguments/account-argument";
import { str } from "../helpers/string-helpper";
import IAccountRepository from "../repositories/interfaces/iaccount-repository";
import AccountRepository from "../repositories/account-repository";
import { num } from "../helpers/number-helper";
import { picture } from "../helpers/picture-helper";
import AddressArgument from "../arguments/address-argument";
import TelephoneArgument from "../arguments/telephone-argument";
import RoleType from "../configurations/enums/role-type-enum";
import AccountModel from "../models/account-model";
import TokenType from "../configurations/enums/token-type-enum";
import config from "../../config";
import TokenResponse from "../responses/token-response";
import AddressResponse from "../responses/address-response";
import TelephoneResponse from "../responses/telephone-response";

class AccountService implements IAccountService {

    private static _instance: IAccountService;
    private _mapper: IMapper;
    private _tokenService: ITokenService;
    private _emailService: IEmailService;
    private _accountRepository: IAccountRepository;

    private constructor() {
        this._mapper = Mapper.instance();
        this._tokenService = TokenService.instance();
        this._emailService = EmailService.instance();
        this._accountRepository = AccountRepository.instance();
    }

    static instance(): IAccountService {
        if (!this._instance) this._instance = new AccountService();
        return this._instance
    }

    async signin(request: SiginRequest): Promise<SigninResponse> {
        try {
            if (await this._accountRepository.emailExists(request.email.toLowerCase()))
                throw new AccountExeption(
                    'Email em uso por outro usuário!',
                    [`O e-mail informado, '${request.email.toLowerCase()}', jé está sendo utilizado por outro usuário.`]);

            const argument: AccountArgument = new AccountArgument();
            argument.email = request.email;
            argument.password = request.password;
            argument.username = str.username(
                `${request.firstName} ${request.lastName}`,
                await this._accountRepository.getSequence() ??
                num.random()
            );

            argument.role = {
                id: RoleType.User,
                role: RoleType[RoleType.User]
            }

            argument.user = {
                name: str.name(`${request.firstName} ${request.lastName}`),
                birthDate: request.birthDate,
                sex: request.sex,
                picture: request.picture ?? picture.sex(request.sex),
                addresses: request.addresses.map(
                    address => this._mapper.map(address, AddressArgument)),
                telephones: request.telephones.map(
                    telephone => this._mapper.map(telephone, TelephoneArgument)),
            }

            const account: AccountModel = await this._accountRepository.createAccount(argument);

            const token: TokenResponse = await this._tokenService.generate({
                type: TokenType.Confirmation,
                content: {
                    name: account.user.name,
                    email: account.email,
                    username: account.username,
                }
            });

            const emailSent: boolean = await this._emailService.send(
                'account-confirmation',
                {
                    to: account.email,
                    subject: 'Nodestore: Confirmação de conta',
                    bodyParms: [
                        account.user.name,
                        `http://${config.server.host}:${config.server.port}/account/confirmation?token=${token.access}`
                    ]
                }
            );

            return {
                success: true,
                messages: [
                    'Registration created successfully.',
                    emailSent ?
                        'Email sent to confirm registration.' :
                        'Pending confirmation of account.'
                ],
                user: {
                    name: account.user.name,
                    username: account.username,
                    email: account.email,
                    addresses: account.user.addresses.map(
                        address => this._mapper.map(address, AddressResponse)),
                    telephones: account.user.telephones.map(
                        telephone => this._mapper.map(telephone, TelephoneResponse)),
                }
            };
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async confirmation(token: string): Promise<AccountConfirmationResponse> {

        const tokenDecoded: JwtPayload | null = await this._tokenService.decode(token);

        if (!tokenDecoded)
            throw new AccountExeption(
                'Token invãlido',
                ['Token informado é inválido!']);

        if (!await this._accountRepository.emailExists(tokenDecoded.payload.email))
            throw new AccountExeption(
                'Usuário inválido!',
                ['Usuário informado é inválido!']);

        const activated: boolean = await this._accountRepository.activeAccount(tokenDecoded.payload.email);

        if (!activated) {
            throw new AccountExeption(
                'Erro ao ativar o usuário.',
                ['Não foi possível ativar a conta do usuário.']);
        }

        await this._emailService.send(
            'account-confirmation-success',
            {
                to: tokenDecoded.payload.email,
                subject: 'Nodestore: Conta confirmada!',
                bodyParms: [
                    tokenDecoded.payload.name,
                    tokenDecoded.payload.username,
                ]
            }
        );

        return {
            status: 'Active',
            username: tokenDecoded.payload.username,
            email: tokenDecoded.payload.email
        }

        throw new Error("");

    }

    async login(request: LoginRequest): Promise<LoginResponse> {
        try {
            const account: AccountModel = await this._accountRepository.getAccount(request.username)
            
            console.log(account);

            if (!account || account.password != request.password)
                throw new AccountExeption(
                    'Login invalido!',
                    [
                        'Email ou senha inválidos!',
                        'Por favor, revise suas credênciais.'
                    ]);

            const token: TokenResponse = await this._tokenService.generate({
                type: TokenType.Access,
                content: {
                    name: account.user.name,
                    email: account.email,
                    username: account.username,
                }
            });

            return {
                token,
                user: {
                    name: account.user.name,
                    username: account.username,
                    email: account.email,
                    addresses: account.user.addresses.map(
                        address => this._mapper.map(address, AddressResponse)),
                    telephones: account.user.telephones.map(
                        telephone => this._mapper.map(telephone, TelephoneResponse)),
                }
            }

        } catch (error) {
            console.error(error);
            throw new AccountExeption('Erro ao efetuar o login');
        }
    }
}

export default AccountService;
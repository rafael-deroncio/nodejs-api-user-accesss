import IMapper from "../configurations/interfaces/imapper";
import Mapper from "../configurations/mapper";
import TokenExeption from "../exceptions/token-exception";
import LoginRequest from "../requests/login.request";
import SigninRequest from "../requests/sigin.request";
import ConfirmAccountResponse from "../responses/confirm.account.response";
import LoginResponse from "../responses/login.response";
import SigninResponse from "../responses/signin.response";
import IAccountService from "./interfaces/iaccount.service";
import ITokenService from "./interfaces/itoken.service";
import TokenService from "./token.service";

class AccountService implements IAccountService {

    //#region dependencies
    private _mapper: IMapper;
    private _service: ITokenService;
    //#endregion

    //#region singleton
    private static _instance: IAccountService;

    protected constructor() {
        this._mapper = Mapper.instance();
        this._service = TokenService.instance();
    }

    public static instance(): IAccountService {
        if (!this._instance)
            this._instance = new AccountService();
        return this._instance
    }
    //#endregion

    public async signin(request: SigninRequest): Promise<SigninResponse> {
        request
        throw new Error("Method not implemented.");
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

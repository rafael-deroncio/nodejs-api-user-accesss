import { JwtPayload } from "jsonwebtoken";
import TokenResponse from "../responses/token-response";
import AccountService from "./account-service";
import IAccountService from "./interfaces/iaccount-service";
import IRefreshTokenService from "./interfaces/irefresh-token-service";
import ITokenService from "./interfaces/itoken-service";
import TokenService from "./token-service";
import AccountResponse from "../responses/account-response";
import TokenType from "../configurations/enums/token-type-enum";

class RefreshTokenService implements IRefreshTokenService {
    private static _instance: IRefreshTokenService;
    private _tokenService: ITokenService;
    private _accountService: IAccountService;

    private constructor() {
        this._accountService = AccountService.instance();
        this._tokenService = TokenService.instance();
    }

    static instance(): IRefreshTokenService {
        if (!this._instance) this._instance = new RefreshTokenService();
        return this._instance
    }

    async refresh(token: string): Promise<TokenResponse> {

        console.log(token);
        

        const tokenDecoded: JwtPayload | null = await this._tokenService.decode(token.replace('Bearer ', ''));

        const account: AccountResponse = await this._accountService.getAccount(tokenDecoded?.payload?.username);

        return await this._tokenService.generate({
            type: TokenType.Refresh,
            content: {
                name: account.user.name,
                email: account.email,
                username: account.username,
                role: account.role
            }
        });
    }
}

export default RefreshTokenService;

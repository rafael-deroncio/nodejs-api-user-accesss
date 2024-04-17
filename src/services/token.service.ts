import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import TokenType from "../configurations/enums/token.type.enum";
import TokenExeption from "../exceptions/token-exception";
import TokenRequest from "../requests/token.request";
import TokenResponse from "../responses/token-response";
import ITokenService from "./interfaces/itoken.service";

class TokenService implements ITokenService {

    //#region  dependencies
    private _secret: string;
    private _expires: string;
    //#endregion

    //#region singleton
    private static _instance: ITokenService;

    protected constructor() {
        if (!config.jwt.secret) {
            console.error('The secret key was not provided.');
            throw new TokenExeption();
        }

        this._secret = config.jwt.secret;
        this._expires = config.jwt.expires;
    }

    public static instance(): ITokenService {
        if (!this._instance)
            this._instance = new TokenService();
        return this._instance
    }
    //#endregion

    public async generate(request: TokenRequest): Promise<TokenResponse> {
        const response: TokenResponse = new TokenResponse();

        response.value = request.type !== TokenType.Confirmation ? 'Bearer ' : '' + this.sign(request.payload);
        response.expires = this.expires(response.value);
        response.type = this.type(request.type);

        return await Promise.resolve(response);
    }

    public async validate(token: string): Promise<boolean> {
        token = token.replace('Bearer ', '')
        return await Promise.resolve(!jwt.verify(token, this._secret));
    }

    public async decode(token: string): Promise<JwtPayload> {
        token = token.replace('Bearer ', '')
        return await Promise.resolve(jwt.decode(token, { complete: true })?.payload as JwtPayload);
    }

    //#region private
    private sign = (payload: object): string => jwt.sign(payload, this._secret, { expiresIn: this._expires });

    private expires = (token: string): number => (jwt.decode(token, { complete: true }) as JwtPayload).payload.exp;

    private type = (type: TokenType): string => TokenType[type]
    //#endregion
}

export default TokenService;

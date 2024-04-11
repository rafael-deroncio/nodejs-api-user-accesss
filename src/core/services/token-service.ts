import jwt, { JwtPayload } from "jsonwebtoken";
import TokenRequest from "../../api/requests/token-request";
import TokenResponse from "../../api/responses/token-response";
import config from "../../config";
import TokenType from "../configurations/enums/token-type-enum";
import TokenExeption from "../exceptions/token-exception";
import ITokenService from "./interfaces/itoken-service";

class TokenService implements ITokenService {
    private static _instance: ITokenService;
    private _secret: string;
    private _expires: string;

    private constructor() {
        this._secret = config.jwt.secret;
        this._expires = config.jwt.expires;

        if (!this._secret) {
            console.error('A chave _secreta não foi fornecida.');
            throw new TokenExeption();
        }
    }

    static instance(): ITokenService {
        if (!this._instance) this._instance = new TokenService();
        return this._instance
    }

    async generate(request: TokenRequest): Promise<TokenResponse> {
        const payload: string | object | Buffer = request.content;

        const access: string = this.sign(payload);
        const expires: number = this.expires(access);
        const type: string = this.type(request.type);

        return { access, expires, type };
    }

    async validate(token: string): Promise<JwtPayload | string> {
        if (!this._secret) {
            console.error('A chave _secreta não foi fornecida.');
            throw new TokenExeption();
        }

        return jwt.verify(token, this._secret);
    }

    async decode(token: string): Promise<JwtPayload | null> {
        return jwt.decode(token, { complete: true });
    }

    private sign = (payload: string | object | Buffer): string => jwt.sign(payload, this._secret, { expiresIn: this._expires });

    private expires = (token: string): number => (jwt.decode(token, { complete: true }) as JwtPayload).payload.exp;

    private type = (type: TokenType): string => TokenType[type]
}

export default TokenService;
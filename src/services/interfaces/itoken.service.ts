import { JwtPayload } from "jsonwebtoken";
import TokenRequest from "../../requests/token.request";
import TokenResponse from "../../responses/token-response";

interface ITokenService {

    generate(request: TokenRequest): Promise<TokenResponse>;

    validate(token: string): Promise<boolean>;

    decode(token: string): Promise<JwtPayload>;
}

export default ITokenService;
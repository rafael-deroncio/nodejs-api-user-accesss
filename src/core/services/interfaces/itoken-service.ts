import { JwtPayload } from 'jsonwebtoken';
import TokenRequest from '../../requests/token-request';
import TokenResponse from '../../responses/token-response';

interface ITokenService {

    generate(request: TokenRequest): Promise<TokenResponse>;

    validate(token: string): Promise<JwtPayload | string>;

    decode(token: string): Promise<JwtPayload | null>;
}

export default ITokenService;
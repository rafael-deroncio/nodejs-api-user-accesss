import { JwtPayload } from 'jsonwebtoken';
import TokenRequest from '../../../api/requests/token-request';
import TokenResponse from '../../../api/responses/token-response';

interface ITokenService {

    generate(request: TokenRequest): Promise<TokenResponse>;

    validate(token: string): Promise<JwtPayload | string>;

    decode(token: string): Promise<JwtPayload | null>;
}

export default ITokenService;
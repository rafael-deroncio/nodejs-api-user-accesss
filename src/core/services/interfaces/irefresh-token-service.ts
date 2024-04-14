import TokenResponse from "../../responses/token-response";

interface IRefreshTokenService {
    refresh(token: string):  Promise<TokenResponse>;
}

export default IRefreshTokenService;

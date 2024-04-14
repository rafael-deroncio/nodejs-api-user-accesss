import LoginRequest from "../../../api/requests/login-request";
import SiginRequest from "../../../api/requests/sigin-request";
import AccountConfirmationResponse from "../../../api/responses/account-confirmation-response";
import LoginResponse from "../../../api/responses/login-response";
import SigninResponse from "../../../api/responses/signin-response";

interface IAccountService {
    signin(request: SiginRequest): Promise<SigninResponse>;
    confirmation(token: string): Promise<AccountConfirmationResponse>;
    login(request: LoginRequest): Promise<LoginResponse>;
}

export default IAccountService;

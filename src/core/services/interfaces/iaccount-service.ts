import LoginRequest from "../../requests/login-request";
import SiginRequest from "../../requests/sigin-request";
import AccountConfirmationResponse from "../../responses/account-confirmation-response";
import AccountResponse from "../../responses/account-response";
import LoginResponse from "../../responses/login-response";
import SigninResponse from "../../responses/signin-response";

interface IAccountService {
    signin(request: SiginRequest): Promise<SigninResponse>;
    confirmation(token: string): Promise<AccountConfirmationResponse>;
    login(request: LoginRequest): Promise<LoginResponse>;
    getAccount(username: string): Promise<AccountResponse>
}

export default IAccountService;

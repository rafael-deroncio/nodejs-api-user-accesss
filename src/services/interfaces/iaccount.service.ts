import SigninRequest from "../../requests/sigin.request";
import SigninResponse from "../../responses/signin.response";
import ConfirmAccountResponse from "../../responses/confirm.account.response";
import LoginRequest from "../../requests/login.request";
import LoginResponse from "../../responses/login.response";

interface IAccountService {
    signin(request: SigninRequest): Promise<SigninResponse>

    confirm(token: string): Promise<ConfirmAccountResponse>

    login(request: LoginRequest): Promise<LoginResponse>
}

export default IAccountService;

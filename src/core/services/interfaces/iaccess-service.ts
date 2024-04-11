import LoginRequest from "../../../api/requests/login-request";
import SiginRequest from "../../../api/requests/sigin-request";
import LoginResponse from "../../../api/responses/login-response";
import SigninResponse from "../../../api/responses/signin-response";

interface IAccessService {
    login(request: LoginRequest): Promise<LoginResponse>;
    signin(request: SiginRequest): Promise<SigninResponse>;
}

export default IAccessService;

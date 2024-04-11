import LoginRequest from "../../api/requests/login-request";
import SiginRequest from "../../api/requests/sigin-request";
import UserRequest from "../../api/requests/user-request";
import LoginResponse from "../../api/responses/login-response";
import SigninResponse from "../../api/responses/signin-response";
import UserResponse from "../../api/responses/user-response";
import IMapper from "../configurations/interfaces/imapper";
import Mapper from "../configurations/mapper";
import AccessExeption from "../exceptions/access-exception";
import IAccessService from "./interfaces/iaccess-service";
import ITokenService from "./interfaces/itoken-service";
import IUserService from "./interfaces/iuser-service";
import TokenService from "./token-service";
import UserService from "./user-service";

class AccessService implements IAccessService {

    private static _instance: IAccessService;
    private _mapper: IMapper;
    private _userService: IUserService;
    private _tokenService: ITokenService;
    // private _accessRepository: IAccessRepository;

    private constructor() {
        this._mapper = Mapper.instance();
        this._userService = UserService.instance();
        this._tokenService = TokenService.instance();
        // this._accessRepository = AccessRepository.instance();
    }

    static instance(): IAccessService {
        if (!this._instance) this._instance = new AccessService();
        return this._instance
    }

    async login(request: LoginRequest): Promise<LoginResponse> {
        await this._userService.emailExists(request.username);
        throw new Error("Method not implemented.");
    }

    async signin(request: SiginRequest): Promise<SigninResponse> {
        try {

            if (await this._userService.emailExists(request.email.toLowerCase()))
                throw new AccessExeption(
                    'Email em uso por outro usuário!',
                    [`O e-mail informado, '${request.email.toLowerCase()}', jé está sendo utilizado por outro usuário.`]);

            const userRequest: UserRequest = this._mapper.map(request, UserRequest);
            const userResponse: UserResponse = await this._userService.createUSer(userRequest);

            

            return {success: true, messages: ['Success'], user: userResponse} as SigninResponse;

        } catch (error) {
            console.error(error);
            throw error

        }
    }
}

export default AccessService;
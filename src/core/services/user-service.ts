import IMapper from "../configurations/interfaces/imapper";
import Mapper from "../configurations/mapper";
import IUserRepository from "../repositories/interfaces/iuser-repository";
import IUserService from "./interfaces/iuser-service";

class UserService implements IUserService {

    private static _instance: IUserService;
    private _mapper: IMapper;
    private _userRepository: IUserRepository;

    private constructor() {
        this._mapper = Mapper.instance();
        this._userRepository = UserRepository.instance();
    }

    static instance(): IUserService {
        if (!this._instance) this._instance = new UserService();
        return this._instance
    }

}

export default UserService;
import UserRequest from "../../api/requests/user-request";
import UserResponse from "../../api/responses/user-response";
import AddressArgument from "../arguments/address-argument";
import CredentialArgument from "../arguments/credential-argument";
import RoleArgument from "../arguments/role-argument";
import TelephoneArgument from "../arguments/telephone-argument";
import UserArgument from "../arguments/user-argument";
import RoleType from "../configurations/enums/role-type-enum";
import SexTypeEnum from "../configurations/enums/sex-type-enum";
import IMapper from "../configurations/interfaces/imapper";
import Mapper from "../configurations/mapper";
import { num } from "../helpers/number-helper";
import { str } from "../helpers/string-helpper";
import UserModel from "../models/user-model";
import IUserRepository from "../repositories/interfaces/iuser-repository";
import UserRepository from "../repositories/user-repository";
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

    async emailExists(email: string): Promise<boolean> {
        return await this._userRepository.getUserByEmail(email) ? true : false;
    }

    async createUSer(request: UserRequest): Promise<UserResponse> {

        const argument = this._mapper.map(request, UserArgument);

        // User: 
        argument.name = str.name(request.name);
        argument.active = false;

        //Credential:
        const credential: CredentialArgument = new CredentialArgument();
        credential.username = str.username(
            argument.name,
            await this._userRepository.getSequence() ?? num.random() + 1);
        credential.email = request.email;
        credential.password = request.password;
        credential.active = false;

        // Address:
        const addresses: AddressArgument[] = request.addresses.map((address, index) => {
            if (index === 0) address.principal = true;
            else address.principal = false;
            return this._mapper.map(address, AddressArgument);
        });

        // Telephone:
        const telephones: TelephoneArgument[] = request.telephones.map((telephone, index) => {
            if (index === 0) telephone.principal = true;
            else telephone.principal = false;
            return this._mapper.map(telephone, TelephoneArgument);
        });

        //Role:
        const role: RoleArgument = new RoleArgument();
        role.id = RoleType.User;
        role.role = RoleType[RoleType.User]

        // Picture:
        argument.picture =
            request.sex === SexTypeEnum[SexTypeEnum.Female] ? '/avatar_pic_female_default.png' :
                request.sex === SexTypeEnum[SexTypeEnum.Male] ? '/avatar_pic_male_default.png' :
                    request.sex === SexTypeEnum[SexTypeEnum.Other] ? '/avatar_pic_other_default.png' :
                        '/avatar_pic_default.png';

        argument.credential = credential;
        argument.addresses = addresses;
        argument.telephones = telephones;
        argument.role = role;

        const user: UserModel | null = await this._userRepository.createUser(argument);

        return this._mapper.map(user, UserResponse);
    }
}

export default UserService;
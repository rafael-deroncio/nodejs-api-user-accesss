import { Request, Response, NextFunction } from "express";
import RequestValidator from "../validators/request-validator";
import IRequestValidator from "../validators/interfaces/irequest-validator";
import { StatusCodes } from "http-status-codes";
import IMapper from "../configurations/interfaces/imapper";
import Mapper from "../configurations/mapper";
import IOptions from "../configurations/interfaces/ioptions";
import Options from "../configurations/options";
import md5 from "md5";
import LoginContract from "../validators/contracts/login-contract";
import LoginRequest from "../../api/requests/login-request";

const mapper: IMapper = Mapper.instance();
const parameters: IOptions = Options.instance();

const login = (request: Request, response: Response, next: NextFunction) => {

    const validator: IRequestValidator = new RequestValidator(LoginContract, request.body);

    if (!validator.isValid)
        return response.status(StatusCodes.BAD_REQUEST)
            .send({ success: false, errors: validator.errors });

    const login = mapper.map(request.body, LoginRequest);

    login.password = md5(request.body + parameters.environment().MD5_SALT);

    request.body = login;

    next();
};

export default login;
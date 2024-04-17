import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import IRequestValidator from "../validators/interfaces/irequest-validator";
import RequestValidator from "../validators/request-validator";
import LoginContract from "../validators/contracts/login-contract";
import LoginRequest from "../requests/login.request";
import IMapper from "../configurations/interfaces/imapper";
import Mapper from "../configurations/mapper";
import md5 from "md5";
import config from "../config";

const mapper: IMapper = Mapper.instance();

const login = (request: Request, response: Response, next: NextFunction) => {
    const validator: IRequestValidator = new RequestValidator(LoginContract, request.body);

    if (!validator.isValid)
        return response.status(StatusCodes.BAD_REQUEST)
            .send({ success: false, errors: validator.errors });

    const login = mapper.map(request.body, LoginRequest);
    login.password = md5(request.body + config.hasher.salt);

    request.body = login;

    next();
}

export default login;

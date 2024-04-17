import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import IRequestValidator from "../validators/interfaces/irequest-validator";
import RequestValidator from "../validators/request-validator";
import SigninContract from "../validators/contracts/signin-contract";
import SigninRequest from "../requests/sigin.request";
import IMapper from "../configurations/interfaces/imapper";
import Mapper from "../configurations/mapper";
import md5 from "md5";
import config from "../config";

const mapper: IMapper = Mapper.instance();

const signin = (request: Request, response: Response, next: NextFunction) => {
    const validator: IRequestValidator = new RequestValidator(SigninContract, request.body);

    if (!validator.isValid)
        return response.status(StatusCodes.BAD_REQUEST)
            .send({ success: false, errors: validator.errors });

    console.log(validator.isValid, validator);

    const signin = mapper.map(request.body, SigninRequest);
    signin.password = md5(request.body + config.hasher.salt);

    request.body = signin;

    next();
}

export default signin;

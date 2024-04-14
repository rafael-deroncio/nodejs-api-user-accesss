import { Request, Response, NextFunction } from "express";
import RequestValidator from "../validators/request-validator";
import SigninContract from "../validators/contracts/signin-contract";
import IRequestValidator from "../validators/interfaces/irequest-validator";
import { StatusCodes } from "http-status-codes";
import IMapper from "../configurations/interfaces/imapper";
import Mapper from "../configurations/mapper";
import SiginRequest from "../../api/requests/sigin-request";
import IOptions from "../configurations/interfaces/ioptions";
import Options from "../configurations/options";
import md5 from "md5";

const mapper: IMapper = Mapper.instance();
const parameters: IOptions = Options.instance();

const signin = (request: Request, response: Response, next: NextFunction) => {

    const validator: IRequestValidator = new RequestValidator(SigninContract, request.body);

    if (!validator.isValid)
        return response.status(StatusCodes.BAD_REQUEST)
            .send({ success: false, errors: validator.errors });

    const signin = mapper.map(request.body, SiginRequest);
    signin.password = md5(request.body + parameters.environment().MD5_SALT);

    request.body = signin;
   
    next();
};

export default signin;
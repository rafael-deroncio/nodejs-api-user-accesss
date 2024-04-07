import { Request, Response, NextFunction } from "express";
import RequestValidator from "../validators/request-validator";
import SigninContract from "../validators/contracts/signin-contract";
import IRequestValidator from "../validators/contracts/interfaces/irequest-validator";
import { StatusCodes } from "http-status-codes";

const signin = (request: Request, response: Response, next: NextFunction) => {

    const validator: IRequestValidator = new RequestValidator(SigninContract, request.body);

    if (!validator.isValid)
        return response.status(StatusCodes.BAD_REQUEST)
            .send({ success: false, errors: validator.errors });

    next();
};

export default signin;
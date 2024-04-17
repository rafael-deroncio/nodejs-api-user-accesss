import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const authentication = (request: Request, response: Response, next: NextFunction) => {

    next();
}

export default authentication;

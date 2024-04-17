import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const authorization = (request: Request, response: Response, next: NextFunction) => {

    next();
}

export default authorization;

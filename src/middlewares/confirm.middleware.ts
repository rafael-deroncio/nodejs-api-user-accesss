import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import TokenExeption from "../exceptions/token-exception";

const confirm = async (request: Request, response: Response, next: NextFunction) => {
    const token = request.query.token?.toString();

    if (!token) throw new TokenExeption(
        'Token not provided',
        ['Confirmation token must be provided via query on the route.'],
        StatusCodes.UNAUTHORIZED);

    request.token = token;

    next();
}

export default confirm;

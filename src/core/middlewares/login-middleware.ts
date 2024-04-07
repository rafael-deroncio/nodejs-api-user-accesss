import { Request, Response, NextFunction } from "express";

const login = (request: Request, response: Response, next: NextFunction) => {
    console.log(request.body);
    next();
};

export default login;
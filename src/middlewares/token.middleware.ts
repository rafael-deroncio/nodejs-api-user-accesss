import { Request, Response, NextFunction } from "express";

const token = {
    access: async (request: Request, response: Response, next: NextFunction) => {

        next();
    },

    refresh: async (request: Request, response: Response, next: NextFunction) => {

        next();
    }
};

export default token;

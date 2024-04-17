import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../config';

const controller = {
    index: async (request: Request, response: Response, next: NextFunction) => {
        try {
            return response.status(StatusCodes.OK)
                .send({
                    route: request.route.path,
                    name: config.app.name,
                    version: config.app.version
                });
        } catch (error) {
            next(error);
        }
    }
};

export default controller;
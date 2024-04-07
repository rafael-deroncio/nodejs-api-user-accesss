import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IOptions from '../../core/configurations/interfaces/ioptions';
import Options from '../../core/configurations/options';

const _options: IOptions = Options.instance();

const controller = {
    index: (request: Request, response: Response, next: NextFunction) => {
        response.status(StatusCodes.OK)
            .send({
                route: request.route.path,
                name: _options.environment().APP_NAME,
                version: _options.environment().APP_VERSION
            });

        next();
    },

    login: async (request: Request, response: Response, next: NextFunction) => {
        try {
            console.log(request.body);
            return response.status(StatusCodes.OK).send({status: 'success'})
        } catch (error) {
            next(error)
        }
    },

    signin: async (request: Request, response: Response, next: NextFunction) => {
        try {
            console.log(request.body);
            return response.status(StatusCodes.OK).send({status: 'success'})
        } catch (error) {
            next(error)
        }
    }
};

export default controller;
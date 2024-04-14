import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IOptions from '../../core/configurations/interfaces/ioptions';
import Options from '../../core/configurations/options';

const _parameters: IOptions = Options.instance();

const controller = {
    index: async (request: Request, response: Response, next: NextFunction) => {
        response.status(StatusCodes.OK)
            .send({
                route: request.route.path,
                name: _parameters.environment().APP_NAME,
                version: _parameters.environment().APP_VERSION
            });

        next();
    }
};

export default controller;
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IOptions from '../../core/configurations/interfaces/ioptions';
import Options from '../../core/configurations/options';
import IAccessService from '../../core/services/interfaces/iaccess-service';
import AccessService from '../../core/services/access-service';
import LoginResponse from '../responses/login-response';
import SigninResponse from '../responses/signin-response';

const _parameters: IOptions = Options.instance();
const _accessService: IAccessService = AccessService.instance();

const controller = {
    index: async (request: Request, response: Response, next: NextFunction) => {
        response.status(StatusCodes.OK)
            .send({
                route: request.route.path,
                name: _parameters.environment().APP_NAME,
                version: _parameters.environment().APP_VERSION
            });

        next();
    },

    login: async (request: Request, response: Response, next: NextFunction) => {
        try {
            const loginRequest = request.body
            const loginResponse: LoginResponse = await _accessService.login(loginRequest);
            return response.status(StatusCodes.OK).send(loginResponse);
        } catch (error) {
            next(error)
        }
    },

    signin: async (request: Request, response: Response, next: NextFunction) => {
        try {
            const signinRequest = request.body
            const signinResponse: SigninResponse = await _accessService.signin(signinRequest);
            return response.status(StatusCodes.OK).send(signinResponse);
        } catch (error) {
            next(error)
        }
    }
};

export default controller;
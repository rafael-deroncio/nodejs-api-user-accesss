import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IAccountService from '../../core/services/interfaces/iaccount-service';
import AccountService from '../../core/services/account-service';
import LoginResponse from '../responses/login-response';

const _accessService: IAccountService = AccountService.instance();

const controller = {
    login: async (request: Request, response: Response, next: NextFunction) => {
        try {
            const loginRequest = request.body
            const loginResponse: LoginResponse = await _accessService.login(loginRequest);
            return response.status(StatusCodes.OK).send(loginResponse);
        } catch (error) {
            next(error)
        }
    }
};

export default controller;

import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IAccountService from '../services/interfaces/iaccount.service';
import AccountService from '../services/account.service';
import SigninRequest from '../requests/sigin.request';
import SigninResponse from '../responses/signin.response';
import ConfirmAccountResponse from '../responses/confirm.account.response';
import LoginRequest from '../requests/login.request';
import LoginResponse from '../responses/login.response';

const account: IAccountService = AccountService.instance();

const controller = {
    signin: async (request: Request, response: Response, next: NextFunction) => {
        try {
            const signinRequest: SigninRequest = request.body
            const signinResponse: SigninResponse = await account.signin(signinRequest);
            return response.status(StatusCodes.OK).send(signinResponse);
        } catch (error) {
            next(error)
        }
    },

    confirm: async (request: Request, response: Response, next: NextFunction) => {
        try {
            const confirmResponse: ConfirmAccountResponse = await account.confirm(request.token);
            return response.status(StatusCodes.OK).send(confirmResponse);
        } catch (error) {
            next(error)
        }
    },

    login: async (request: Request, response: Response, next: NextFunction) => {
        try {
            const loginRequest: LoginRequest = request.body
            const loginResponse: LoginResponse = await account.login(loginRequest);
            return response.status(StatusCodes.OK).send(loginResponse);
        } catch (error) {
            next(error)
        }
    }
};

export default controller;

import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
// import IAccountService from '../services/interfaces/iaccount-service';
// import AccountService from '../services/account-service';
// import AccountConfirmationResponse from '../responses/account-confirmation-response';
// import SiginRequest from '../requests/sigin-request';
// import SigninResponse from '../responses/signin-response';
// import LoginResponse from '../responses/login-response';
// import LoginRequest from '../requests/login-request';

// const account: IAccountService = AccountService.instance();

const controller = {
    signin: async (request: Request, response: Response, next: NextFunction) => {
        try {
            // const signinRequest: SiginRequest = request.body
            // const signinResponse: SigninResponse = await account.signin(signinRequest);
            // return response.status(StatusCodes.OK).send(signinResponse);
            return response.status(StatusCodes.OK).send({ controller: true })
        } catch (error) {
            next(error)
        }
    },

    confirm: async (request: Request, response: Response, next: NextFunction) => {
        try {
            // const token: string = request.token!;
            // const confirmation: AccountConfirmationResponse = await account.confirm(token);
            // return response.status(StatusCodes.OK).send(confirmation);
            return response.status(StatusCodes.OK).send({ controller: true })
        } catch (error) {
            next(error)
        }
    },

    login: async (request: Request, response: Response, next: NextFunction) => {
        try {
            // const loginRequest: LoginRequest = request.body
            // const loginResponse: LoginResponse = await account.login(loginRequest);
            // return response.status(StatusCodes.OK).send(loginResponse);
            return response.status(StatusCodes.OK).send({ controller: true })
        } catch (error) {
            next(error)
        }
    }
};

export default controller;

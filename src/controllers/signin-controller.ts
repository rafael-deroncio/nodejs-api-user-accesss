import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IAccountService from '../core/services/interfaces/iaccount-service';
import AccountService from '../core/services/account-service';
import SigninResponse from '../core/responses/signin-response';
import SiginRequest from '../core/requests/sigin-request';

const _accessService: IAccountService = AccountService.instance();

const controller = {
    signin: async (request: Request, response: Response, next: NextFunction) => {
        try {
            const signinRequest: SiginRequest = request.body
            const signinResponse: SigninResponse = await _accessService.signin(signinRequest);
            return response.status(StatusCodes.OK).send(signinResponse);
        } catch (error) {
            next(error)
        }
    }
};

export default controller;

import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import IAccountService from '../core/services/interfaces/iaccount-service';
import AccountService from '../core/services/account-service';
import AccountConfirmationResponse from '../core/responses/account-confirmation-response';

const _accountService: IAccountService = AccountService.instance();

const controller = {
    confirmation: async (request: Request, response: Response, next: NextFunction) => {
        try {
            const token: string = request.token!;
            const confirmation: AccountConfirmationResponse = await _accountService.confirmation(token);
            return response.status(StatusCodes.OK).send(confirmation);
        } catch (error) {
            next(error)
        }
    }
};

export default controller;

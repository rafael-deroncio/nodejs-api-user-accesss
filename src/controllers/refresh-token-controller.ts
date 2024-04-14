import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import TokenResponse from "../core/responses/token-response";
import IRefreshTokenService from "../core/services/interfaces/irefresh-token-service";
import RefreshTokenService from "../core/services/refresh-token-service";

const _refreshTokenService: IRefreshTokenService = RefreshTokenService.instance();

const controller = {
    refresh: async (request: Request, response: Response, next: NextFunction) => {
        try {
            const token: string = request.token!;
            const tokenResponse: TokenResponse = await _refreshTokenService.refresh(token);
            return response.status(StatusCodes.OK).send(tokenResponse);
        } catch (error) {
            next(error)
        }
    }
};

export default controller;
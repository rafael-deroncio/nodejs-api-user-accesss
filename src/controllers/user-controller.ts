import { Request, Response, NextFunction } from "express";
import IUserService from "../core/services/interfaces/iuser-service";
import UserService from "../core/services/user-service";
import { StatusCodes } from "http-status-codes";
import UserResponse from "../core/responses/user-response";

const _userService: IUserService = UserService.instance();

const controller = {
    get: async (request: Request, response: Response, next: NextFunction) => {
        try {
            const username: string = request.user?.username ?? ''
            const user: UserResponse = await _userService.getUser(username);
            return response.status(StatusCodes.OK).send(user);
        } catch (error) {
            next(error)
        }
    },

    getAll: async (request: Request, response: Response, next: NextFunction) => {
        try {
            const username: string = request.user?.username ?? ''
            const user: UserResponse = await _userService.getUser(username);
            return response.status(StatusCodes.OK).send(user);
        } catch (error) {
            next(error)
        }
    },

    update: async (request: Request, response: Response, next: NextFunction) => {
        try {
            const username: string = request.user?.username ?? ''
            const user: UserResponse = await _userService.getUser(username);
            return response.status(StatusCodes.OK).send(user);
        } catch (error) {
            next(error)
        }
    },
};

export default controller;

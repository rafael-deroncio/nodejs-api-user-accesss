import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
// import TokenService from "../services/token-service";
// import ITokenService from "../services/interfaces/itoken-service";
// import TokenExeption from "../exceptions/token-exception";

// const service: ITokenService = TokenService.instance();

const confirm = async (request: Request, response: Response, next: NextFunction) => {
    const token = request.query.token?.toString();

    // if (!token) throw new TokenExeption(
    //     'Token não informado',
    //     ['Token de confirmação deve ser informado via query na rota.'],
    //     StatusCodes.UNAUTHORIZED);

    // if (!await service.validate(token))
    //     if (!token?.toString()) throw new TokenExeption(
    //         'Token inválido',
    //         ['Token informado não é válido.'],
    //         StatusCodes.UNAUTHORIZED);

    // request.token = token;

    next();
}

export default confirm;

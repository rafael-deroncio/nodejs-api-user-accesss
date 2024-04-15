import { Request, Response, NextFunction } from "express";
import TokenService from "../services/token-service";
import ITokenService from "../services/interfaces/itoken-service";
import TokenExeption from "../exceptions/token-exception";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

const _tokenService: ITokenService = TokenService.instance();

const authenticate = async (request: Request, response: Response, next: NextFunction) => {

    const token = request.headers['authorization'];

    if (!token) throw new TokenExeption(
        'Login nescessário!',
        ['Você precisa se authenticar para acessar esse recurso.'],
        StatusCodes.UNAUTHORIZED);

    if (!await _tokenService.validate(token))
        if (!token?.toString()) throw new TokenExeption(
            'Acesso Restrito!',
            ['Você não pode acessar esse recurso.'],
            StatusCodes.UNAUTHORIZED);

    const tokenDecoded: JwtPayload | null = await _tokenService.decode(token);

    if (!tokenDecoded)
        throw new TokenExeption(
            'Token invãlido',
            ['Token informado é inválido!']);

    request.user = {
        email: tokenDecoded.payload.email,
        username: tokenDecoded.payload.username,
        name: tokenDecoded.payload.name,
        role: tokenDecoded.payload.role
    }

    next();
}

export default authenticate;

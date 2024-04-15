import { Request, Response, NextFunction } from "express";
import TokenService from "../services/token-service";
import ITokenService from "../services/interfaces/itoken-service";
import TokenExeption from "../exceptions/token-exception";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import RoleType from "../configurations/enums/role-type-enum";

const _tokenService: ITokenService = TokenService.instance();

const authorize = async (request: Request, response: Response, next: NextFunction) => {

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

    if (tokenDecoded.payload.role !== RoleType[RoleType.Admin] || tokenDecoded.payload.role !== RoleType[RoleType.Manager])
        if (!token?.toString()) throw new TokenExeption(
            'Acesso negado',
            ['Você não pode acessar esse recurso.'],
            StatusCodes.UNAUTHORIZED);

    next();
}

export default authorize;

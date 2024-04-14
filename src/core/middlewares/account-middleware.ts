import { Request, Response, NextFunction } from "express";
import TokenService from "../services/token-service";
import ITokenService from "../services/interfaces/itoken-service";
import TokenExeption from "../exceptions/token-exception";

const _tokenService: ITokenService = TokenService.instance();

const account = {
    confirmation: async (request: Request, response: Response, next: NextFunction) => {
        const token = request.query.token?.toString();

        if (!token) throw new TokenExeption(
            'Token não informado',
            ['Token de confirmação deve ser informado via query na rota.']);

        if (!await _tokenService.validate(token))
            if (!token?.toString()) throw new TokenExeption(
                'Token inválido',
                ['Token informado não é válido.']);

        request.token = token;
        
        next();
    }
};

export default account;

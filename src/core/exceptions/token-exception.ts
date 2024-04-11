import { StatusCodes } from "http-status-codes";
import ResponseType from "../configurations/enums/response-type-enum";
import BaseException from "./base-exception";

class TokenExeption extends BaseException {
    constructor(title?: string, messages?: string[], code?: StatusCodes) {
        super(title, messages, code);

        this.title = title ?? 'Erro ao gerar token';
        this.messages = messages ?? ['Erro Interno. Tente novamente mais tarde!'];
        this.code = code ?? StatusCodes.UNPROCESSABLE_ENTITY;
        this.status = StatusCodes[this.code];
        this.type = this.code >= 500 ? ResponseType[ResponseType.Fatal] : this.code >= 400 ? ResponseType[ResponseType.Error] : ResponseType[ResponseType.Success];
    }
}

export default TokenExeption;
import { StatusCodes } from "http-status-codes";
import BaseException from "./base.exception";
import ResponseType from "../configurations/enums/response.type.enum";

class DatabaseException extends BaseException {
    constructor(title?: string, messages?: string[], code?: StatusCodes) {
        super(title, messages, code);

        this.title = title ?? 'Erro Interno';
        this.messages = messages ?? ['Não foi possível processsar a solicitação nesse momento. Tente novamente mais tarde!'];
        this.code = code ?? StatusCodes.UNPROCESSABLE_ENTITY;
        this.status = StatusCodes[this.code];
        this.type = this.code >= 500 ? ResponseType[ResponseType.Fatal] : this.code >= 400 ? ResponseType[ResponseType.Error] : ResponseType[ResponseType.Success];
    }
}

export default DatabaseException;
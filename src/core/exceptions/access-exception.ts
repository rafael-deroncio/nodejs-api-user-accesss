import { StatusCodes } from "http-status-codes";
import ResponseType from "../configurations/enums/response-type-enum";
import BaseException from "./base-exception";

class AccessExeption extends BaseException {
    constructor(title?: string, messages?: string[], code?: StatusCodes) {
        super(title, messages, code);

        this.title = title ?? 'Erro de Acesso';
        this.messages = messages ?? ['Erro ao processar o acesso! Tente novamente mais tarde'];
        this.code = code ?? StatusCodes.BAD_REQUEST;
        this.status = StatusCodes[this.code];
        this.type = this.code >= 500 ? ResponseType[ResponseType.Fatal] : this.code >= 400 ? ResponseType[ResponseType.Error] : ResponseType[ResponseType.Success];
    }
}

export default AccessExeption;
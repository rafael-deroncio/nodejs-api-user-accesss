import { StatusCodes } from "http-status-codes";
import ResponseType from "../configurations/enums/response-type-enum";

class BaseException extends Error {
    title: string;
    messages: string[];
    type: string;
    status: string;
    code: StatusCodes;

    constructor(title?: string, messages?: string[], code?: StatusCodes) {
        super(messages?.join('; '));

        this.title = title ?? 'Erro Interno';
        this.messages = messages ?? ['Não foi possível processsar a solicitação nesse momento. Tente novamente mais tarde!'];
        this.code = code ?? StatusCodes.INTERNAL_SERVER_ERROR;
        this.status = StatusCodes[this.code];
        this.type = this.code >= 500 ? ResponseType[ResponseType.Fatal] : this.code >= 400 ? ResponseType[ResponseType.Error] : ResponseType[ResponseType.Success];

        Object.setPrototypeOf(this, BaseException.prototype);
    }

    public description() {
        return {
            title: this.title,
            messages: this.messages,
            type: this.type,
            status: this.status,
            code: this.code
        }
    }
}

export default BaseException;
import { Expose } from "class-transformer";
import TokenType from "../configurations/enums/token.type.enum";
import TokenPayloadRequest from "./token.payload.request";

class TokenRequest {

    @Expose()
    type!: TokenType;

    @Expose()
    payload!: TokenPayloadRequest;
}

export default TokenRequest;

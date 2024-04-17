import { Expose } from "class-transformer";
import TokenType from "../configurations/enums/token.type.enum";

class TokenRequest {

    @Expose()
    type!: TokenType;

    @Expose()
    payload!: object;
}

export default TokenRequest;

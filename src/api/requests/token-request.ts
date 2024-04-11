import TokenType from "../../core/configurations/enums/token-type-enum";

class TokenRequest {
    content!: object;
    type!: TokenType
}

export default TokenRequest;

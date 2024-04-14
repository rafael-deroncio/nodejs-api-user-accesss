import TokenType from "../configurations/enums/token-type-enum";

class TokenRequest {
    content!: object;
    type!: TokenType
}

export default TokenRequest;

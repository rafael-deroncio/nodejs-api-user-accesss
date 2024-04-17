import { Expose } from "class-transformer";

class TokenResponse {

    @Expose()
    value!: string;

    @Expose()
    expires!: number;

    @Expose()
    type!: string;
}
export default TokenResponse

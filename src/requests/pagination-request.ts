import { Expose } from "class-transformer";

class PaginationRequest {

    @Expose()
    size: number;

    @Expose()
    page: number;

    constructor(page: number = 1, size: number = 10) {
        this.page = page > 0 ? page : 1;
        this.size = size > 0 || size > 10 ? 10 : size
    }
}

export default PaginationRequest;

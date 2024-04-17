class PaginationRequest {
    size: number;
    page: number;
    total: number;

    constructor(page?: number, size?: number, total?: number) {
        this.page = page && page > 0 ? page : 1;
        this.size = size && size > 0 && size <= 10 ? size : 10;
        this.total = total ? total : this.size
    }
}

export default PaginationRequest;

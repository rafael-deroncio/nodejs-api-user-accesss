class PaginationResponse {
    page: number;
    total: number;
    first: string;
    last: string;
    previous?: string;
    next?: string;
    content?: object

    constructor(page: number, total: number, first: string, last: string, previous?: string, next?: string, content?: object) {
        this.page = page
        this.total = total;

        this.first = first
        this.last = last
        this.previous = previous
        this.next = next

        this.content = content;
    }
}

export default PaginationResponse;

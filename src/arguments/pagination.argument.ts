import { Expose } from "class-transformer";

class PaginationArgument {

    @Expose()
    size!: number;

    @Expose()
    page!: number;
}

export default PaginationArgument;

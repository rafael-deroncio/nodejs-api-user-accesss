
declare namespace Express {
    export interface Request {
        token?: string;
        user?: {
            role: number,
            name: string,
            email: string,
            username: string,
        };
    }
}

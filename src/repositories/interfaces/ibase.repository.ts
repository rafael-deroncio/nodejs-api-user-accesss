import { ObjectLiteral, Repository } from "typeorm";

interface IBaseRepository<Entity extends ObjectLiteral> {

    start(): Promise<void>;

    commit(): Promise<void>;

    rollback(): Promise<void>;
    
    connection(): Repository<Entity>;

    total(): Promise<number>;
}

export default IBaseRepository;

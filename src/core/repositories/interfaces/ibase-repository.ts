import { ObjectLiteral, Repository } from "typeorm";

interface IBaseConnection<T extends ObjectLiteral> {

  repository(): Repository<T>;

  start(): Promise<void>;

  commit(): Promise<void>;

  rollback(): Promise<void>;

  release(): Promise<void>;
}

export default IBaseConnection;

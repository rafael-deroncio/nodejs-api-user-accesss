import { DataSource, DataSourceOptions, EntityTarget, ObjectLiteral, QueryRunner, Repository } from "typeorm";
import IBaseConnection from "./interfaces/ibase-repository";
import DatabaseException from "../exceptions/database-exception";

class BaseRepository<T extends ObjectLiteral> implements IBaseConnection<T> {

    private _options;
    private _connection!: DataSource;
    private _queryRunner!: QueryRunner;
    private _entity!: EntityTarget<T>;
    private _repository!: Repository<T>;

    constructor(options: object, entity: EntityTarget<T>) {
        this._options = options as DataSourceOptions;
        this._entity = entity;
        this.connect();
    }

    private connect(): void {
        try {
            if (!this._connection)
                this._connection = new DataSource(this._options);
            this._repository = this._connection.getRepository<T>(this._entity)
            console.log("Connected to the database successfully");
        } catch (error) {
            console.error("Error connecting to the database:", error);
            throw new DatabaseException();
        }
    }

    repository(): Repository<T> {
        return this._repository;
    }


    async start(): Promise<void> {
        try {
            if (!this._connection) {
                console.error("Connection not initialized");
                throw new DatabaseException();
            }

            this._queryRunner = this._connection.createQueryRunner();
            await this._queryRunner.startTransaction();

        } catch (error) {
            console.error("Unable to start transaction:", error);
            throw error
        }
    }

    async commit(): Promise<void> {
        try {
            if (!this._queryRunner) {
                console.error("Connection not initialized");
                throw new DatabaseException();
            }
            await this._queryRunner.commitTransaction();
            await this._queryRunner.release();
        } catch (error) {
            console.error("Unable to start transaction:", error);
            throw error
        }
    }

    async rollback(): Promise<void> {
        try {
            if (!this._queryRunner) {
                console.error("Connection not initialized");
                throw new DatabaseException();
            }
            await this._queryRunner.commitTransaction();
            await this._queryRunner.release();
        } catch (error) {
            console.error("Unable to start transaction:", error);
            throw error
        }
    }

    async release(): Promise<void> {
        try {
            if (!this._queryRunner) {
                console.error("Connection not initialized");
                throw new DatabaseException();
            }
            await this._queryRunner.release();
        } catch (error) {
            console.error("Unable to start transaction:", error);
            throw error;
        }
    }
}

export default BaseRepository;
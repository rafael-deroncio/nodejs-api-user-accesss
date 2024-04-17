import { ObjectLiteral, EntityTarget, Repository, QueryRunner } from "typeorm";
import { typeorm } from "../configurations/typeorm";
import BaseException from "../exceptions/base.exception";
import DatabaseException from "../exceptions/database.exception";
import IBaseRepository from "./interfaces/ibase.repository";

class BaseRepository<T extends ObjectLiteral> implements IBaseRepository<T> {

    private _entity!: EntityTarget<T>;
    private _connection: Repository<T>;
    private _runner: QueryRunner | null;

    constructor(entity: EntityTarget<T>) {
        this._entity = entity;
        this._connection = typeorm.getRepository(this._entity)
        this._runner = null;
    }
    
    total(): Promise<number> {
        return Promise.resolve(0)
    }

    getSequence(): Promise<number | null> {
        return Promise.resolve(null);
    }

    async start(): Promise<void> {
        try {
            console.log('Transaction started');
            if (!this._runner)
                this._runner = typeorm.createQueryRunner();

            this._runner?.startTransaction();
        } catch (e) {
            console.error(`Transaction error: ${e}`);
            throw new DatabaseException();
        }
    }

    async commit(): Promise<void> {
        try {
            console.log('Commit started');
            if (!this._runner) {
                console.error('Transaction not started.');
                throw new DatabaseException();
            }

            this._runner?.commitTransaction();
            this._runner?.release();
            this._runner = null;

        } catch (e) {
            if (e instanceof BaseException)
                throw e;
            else {
                console.error(`Commit error: ${e}`);
                throw new DatabaseException();
            }
        } finally {
            console.log('Commit finished');
        }
    }

    async rollback(): Promise<void> {
        try {
            console.log('Rollback started');
            if (!this._runner) {
                console.error('Transaction not started.');
            }

            this._runner?.rollbackTransaction();
            this._runner?.release();
            this._runner = null;
        } catch (e) {
            if (e instanceof BaseException)
                throw e;
            else {
                console.error(`Rollback error: ${e}`);
                throw new DatabaseException();
            }
        } finally {
            console.log('Rollback finished');
        }
    }
    
    connection(): Repository<T> {
        return this._connection
    }
}

export default BaseRepository;

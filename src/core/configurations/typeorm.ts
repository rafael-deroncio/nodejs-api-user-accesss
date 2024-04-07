import { DataSource, DataSourceOptions } from "typeorm";
import ITypeOrm from "./interfaces/itypeorm";
import config from "../../config";

class TypeOrm {

    private static _instance: ITypeOrm;
    private _options: DataSourceOptions
    private _datasourde!: DataSource;

    static instance(): ITypeOrm {
        if (!this._instance) this._instance = new TypeOrm();
        return this._instance
    }

    private constructor() {
        this._options = { ...config.database.options } as DataSourceOptions
    }

    initialize() {
        try {
            if (this._datasourde)
                return;
            this._datasourde = new DataSource(this._options);
            this._datasourde.initialize();
            console.log('Database initialized successfully!');
        } catch (error) {
            console.error(`Error starting the Database. ${error}`);
            throw error;
        }
    }
}

export default TypeOrm;
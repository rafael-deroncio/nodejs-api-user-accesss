import { DataSource, DataSourceOptions } from "typeorm";
import config from "../../config";

const typeorm = {
    initialize: () => {
        try {
            new DataSource({ ...config.database.options } as DataSourceOptions).initialize()
            console.log('Database initialized successfully!');
        } catch (error) {
            console.error(`Error starting the Database. ${error}`);
        }
    },
    options: { ...config.database.options } as DataSourceOptions,
}

export default typeorm;
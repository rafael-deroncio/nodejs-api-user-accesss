import IOptions from "./core/configurations/interfaces/ioptions";
import Options from "./core/configurations/options";
import http from 'http';
import fs from 'fs';
import path from 'path';
import md5 from "md5";

const parameters: IOptions = Options.instance();

const HOST: string = parameters.environment().APP_HOST ?? 'localhost';
const PORT: string = parameters.environment().APP_PORT ?? '3000';
const ENV: string = parameters.environment().APP_ENV ?? 'dev';
const LOG_PATH: string = parameters.environment().LOG_PATH ?? './logs';

const TYPEORM_TYPE: string = parameters.environment().TYPEORM_TYPE ?? 'sqlite';
const TYPEORM_DATABASE: string = parameters.environment().TYPEORM_DATABASE ?? './database.sqlite';
const TYPEORM_LOGGING: boolean = Boolean(parameters.environment().TYPEORM_LOGGING) ?? false;

const JWT_SECRET: string = parameters.environment().JWT_SECRET ?? "";
const JWT_EXPIRES: string = parameters.environment().JWT_EXPIRES ?? "1d";

const MANAGER_EMAIL: string = parameters.environment().MANAGER_EMAIL ?? "manager.api@nodestore.com";
const MANAGER_USERNAME: string = parameters.environment().MANAGER_USERNAME ?? "manager";
const MANAGER_PASSWORD: string = parameters.environment().MANAGER_PASSWORD ?? "Manager@2024&API";

const ADMIN_EMAIL: string = parameters.environment().ADMIN_EMAIL ?? "admin.api@nodestore.com";
const ADMIN_USERNAME: string = parameters.environment().ADMIN_USERNAME ?? "admin";
const ADMIN_PASSWORD: string = parameters.environment().ADMIN_PASSWORD ?? "Admin@2024&API";

const EMAIL_TEMPL_BASE_PATH: string = parameters.environment().EMAIL_TEMPL_BASE_PATH ?? "/templates";
const EMAIL_TEMPL_BASE_EXTENSION: string = parameters.environment().EMAIL_TEMPL_BASE_EXTENSION ?? ".html";
const EMAIL_SENDGRID_SECRET: string = parameters.environment().EMAIL_SENDGRID_SECRET ?? "";
const EMAIL_SENDGRID_FROM: string = parameters.environment().EMAIL_SENDGRID_FROM ?? "";

const config = {
    server: {
        host: HOST,
        port: PORT,

        onListen() {
            console.log(`API running in http://${HOST}:${PORT}`);
        },

        onListening(server: http.Server) {
            if (server && server.address()) {
                const addr = server.address();
                const bind = typeof addr === 'string' ?
                    `pipe ${addr}` :
                    `port ${addr?.port}`;
                console.log(`Listening on ${bind}`);
            } else {
                console.log('Server listening...');
            }
        },

        onError(error: NodeJS.ErrnoException) {
            if (error.syscall !== 'listen')
                throw error;

            const bind = typeof process.env.PORT === 'string' ?
                `Pipe ${process.env.PORT}` :
                `Port ${process.env.PORT}`;

            switch (error.code) {
                case 'EACCES':
                    console.error(`${bind} required elevated privileges`);
                    process.exit(1);
                    break;

                case 'EADDRINUSE':
                    console.error(`${bind} is already in use`);
                    process.exit(1);
                    break;

                case 'ECONNREFUSED':
                    console.error(`Connection refused to ${bind}`);
                    process.exit(1);
                    break;

                case 'EHOSTUNREACH':
                    console.error(`Host unreachable at ${bind}`);
                    process.exit(1);
                    break;

                case 'ETIMEDOUT':
                    console.error(`Connection to ${bind} timed out`);
                    process.exit(1);
                    break;

                default:
                    throw error;
            }
        }
    },

    app: {
        env: ENV,
        morgan: {
            format: ENV === 'dev' ? 'dev' : 'common',
            stream: () => {
                const date: Date = new Date();
                const file: string = `LOG_${ENV}_${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}.log`;
                const dir: string = path.join(LOG_PATH, file);
                fs.createWriteStream(dir, { flags: 'a' });
            }
        }
    },

    database: {
        options: {
            type: TYPEORM_TYPE,
            database: TYPEORM_DATABASE,
            synchronize: ENV === 'dev' ? true : false,
            logging: ENV === 'dev' ? TYPEORM_LOGGING : false,
            entities: [path.join(__dirname, './core/configurations/entities/*.ts')],
            migrations: [path.join(__dirname, './core/configurations/migrations/*.ts')]
        }
    },

    jwt: {
        secret: JWT_SECRET,
        expires: JWT_EXPIRES
    },

    access: {
        manager: {
            email: MANAGER_EMAIL.toLowerCase(),
            username: MANAGER_USERNAME.toLowerCase(),
            password: md5(MANAGER_PASSWORD + parameters.environment().MD5_SALT)
        },
        admin: {
            email: ADMIN_EMAIL.toLowerCase(),
            username: ADMIN_USERNAME.toLowerCase(),
            password: md5(ADMIN_PASSWORD + parameters.environment().MD5_SALT)
        }
    },

    email: {
        templates: EMAIL_TEMPL_BASE_PATH,
        extension: EMAIL_TEMPL_BASE_EXTENSION,
        sendgrid: {
            secret: EMAIL_SENDGRID_SECRET,
            from: EMAIL_SENDGRID_FROM
        }
    }
}


export default config;

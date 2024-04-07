import IOptions from "./core/configurations/interfaces/ioptions";
import Options from "./core/configurations/options";
import http from 'http';
import fs from 'fs';
import path from 'path';

const parameters: IOptions = Options.instance();

const HOST: string = parameters.environment().APP_HOST ?? 'localhost';
const PORT: string = parameters.environment().APP_PORT ?? '3000';
const ENV: string = parameters.environment().APP_ENV ?? 'dev';
const LOG_PATH: string = parameters.environment().LOG_PATH ?? './logs'

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
                const file: string = `LOG_${ENV}_${date.getFullYear()}${date.getMonth()+1}${date.getDate()}.log`;
                const dir: string = path.join(LOG_PATH, file);
                fs.createWriteStream(dir, { flags: 'a' });
            }
        }
    },
}

export default config;

import express from "express";
import http from 'http';
import config from './config';
import routes from "./api/routes/routes";
import morgan from "morgan";
import exception from "./core/handlers/global-error-handler";
import typeorm from "./core/configurations/typeorm";

const app = express();

app.use(express.json());
app.use(morgan(config.app.morgan.format));
app.use(routes);
app.use(exception.handler);

app.set('host', config.server.host);
app.set('port', config.server.port);

const server = http.createServer(app);

server.listen(config.server.port, config.server.onListen);
server.on('listening', config.server.onListening);
server.on('error', config.server.onError);

typeorm.initialize();

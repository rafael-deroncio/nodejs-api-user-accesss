import { Router } from "express";
import controller from "../controllers/account.controller";
import middleware from "../middlewares/middleware";

const account: Router = Router();

account.post('/account/signin', middleware.signin, controller.signin);
account.get('/account/confirm', middleware.confirm, controller.confirm);
account.post('/account/login', middleware.login, controller.login);

export default account;

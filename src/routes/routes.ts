import { Router } from "express";
import index from "./index-route";
import login from "./login-route";
import signin from "./signin-route";
import account from "./account-route";
import token from "./token-route";

const routes: Router = Router();

routes.use(index);
routes.use(login);
routes.use(signin);
routes.use(account);
routes.use(token)

export default routes;

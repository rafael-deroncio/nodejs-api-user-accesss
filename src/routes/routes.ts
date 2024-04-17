import { Router } from "express";
import controller from "../controllers/index-controller";
import account from "./account.route";

const routes: Router = Router();

routes.get('/', controller.index);
routes.use(account);

export default routes;

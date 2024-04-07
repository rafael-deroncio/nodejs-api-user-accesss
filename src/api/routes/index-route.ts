import controller from "../controllers/index-controller";
import { Router } from "express";
import middleware from "../../core/middlewares/middlewares";

const index: Router = Router();

index.get('/', controller.index);
index.post('/signin', middleware.signin, controller.signin);
index.post('/login', middleware.login, controller.login);

export default index;

import controller from "../controllers/refresh-token-controller";
import { Router } from "express";
import middleware from "../core/middlewares/middlewares";

const token: Router = Router();

token.get('/token/refresh', middleware.token.refresh, controller.refresh);

export default token;

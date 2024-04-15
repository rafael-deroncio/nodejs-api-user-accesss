import controller from "../controllers/user-controller";
import { Router } from "express";
import middleware from "../core/middlewares/middlewares";

const user: Router = Router();

user.get('/users', middleware.authenticate, middleware.authorize, controller.getAll);
user.get('/user/:username', middleware.authenticate, controller.get);
user.put('/user/:username', middleware.authenticate, controller.update);

export default user;

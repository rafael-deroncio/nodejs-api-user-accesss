import controller from "../controllers/login-controller";
import { Router } from "express";
import middleware from "../core/middlewares/middlewares";

const login: Router = Router();

login.post('/login', middleware.login, controller.login);

export default login;

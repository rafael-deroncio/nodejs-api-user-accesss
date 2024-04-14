import controller from "../controllers/signin-controller";
import { Router } from "express";
import middleware from "../../core/middlewares/middlewares";

const signin: Router = Router();

signin.post('/signin', middleware.signin, controller.signin);

export default signin;

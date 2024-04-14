import controller from "../controllers/account-controller";
import { Router } from "express";
import middleware from "../core/middlewares/middlewares";

const account: Router = Router();

account.get('/account/confirmation', middleware.account.confirmation, controller.confirmation);

export default account;

import { Router } from "express";
import index from "./index-route";

const routes: Router = Router();

routes.use(index);

export default routes;

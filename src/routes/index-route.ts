import controller from "../controllers/index-controller";
import { Router } from "express";

const index: Router = Router();

index.get('/', controller.index);

export default index;
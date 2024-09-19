import { Router } from "express";
import { createJobController } from "../controller/jobController";

let jobRouter = Router();

jobRouter.route("/").post(createJobController);

export default jobRouter;

import { Router } from "express";
import {
  createJobController,
  readJobController,
} from "../controller/jobController";

let jobRouter = Router();

jobRouter.route("/").post(createJobController).get(readJobController);

export default jobRouter;

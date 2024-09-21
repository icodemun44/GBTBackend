import { Router } from "express";
import {
  createJobController,
  deleteJobController,
  readJobController,
} from "../controller/jobController.js";

let jobRouter = Router();

jobRouter
  .route("/")
  .post(createJobController)
  .get(readJobController)
  .delete(deleteJobController);

export default jobRouter;

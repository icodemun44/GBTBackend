import { Router } from "express";
import {
  createJobController,
  deleteJobController,
  getJobByTitleController,
  readJobController,
  updateJobController,
} from "../controller/jobController.js";

let jobRouter = Router();

jobRouter
  .route("/")
  .post(createJobController)
  .get(readJobController)
  .delete(deleteJobController)
  .patch(updateJobController);

jobRouter.get("/", getJobByTitleController);

export default jobRouter;

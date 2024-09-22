import { Router } from "express";
import {
  createJobController,
  deleteJobController,
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

jobRouter.get("/.title", getJobByTitleController);

export default jobRouter;

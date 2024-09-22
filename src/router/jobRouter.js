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
  .delete(deleteJobController)
  .patch(updateJobController);

jobRouter.get("/", (req, res) => {
  if (req.query.title) {
    return getJobByTitleController(req, res);
  } else {
    return readJobController(req, res);
  }
});

export default jobRouter;

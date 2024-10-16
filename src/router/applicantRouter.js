import { Router } from "express";
import {
  deleteApplicantController,
  readApplicantController,
} from "../controller/applicantController.js";

let applicantRouter = Router();

applicantRouter
  .route("/")
  .get(readApplicantController)
  .delete(deleteApplicantController);

// applicantRouter.route("/", (req, res) => {
//   if (req.query.title) {
//     return null;
//   } else {
//     return readApplicantController(req, res);
//   }
// });

export default applicantRouter;

import { Router } from "express";
import { readApplicantController } from "../controller/applicantController.js";

let applicantRouter = Router();

applicantRouter.route("/").get(readApplicantController);

// applicantRouter.route("/", (req, res) => {
//   if (req.query.title) {
//     return null;
//   } else {
//     return readApplicantController(req, res);
//   }
// });

export default applicantRouter;

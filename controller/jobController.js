import { createJobService, readJobService } from "../src/jobService";

export const createJobController = async (req, res, next) => {
  let result = await createJobService(req.body);
  res.status(201).json({
    success: true,
    message: "Job created successfully",
    result: result,
  });
};

export const readJobController = async (req, res, next) => {
  let result = await readJobService();
  res.status(200).json({
    success: true,
    message: "User read successfully",
    result: result,
  });
};

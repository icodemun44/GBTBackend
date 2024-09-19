import { createJobService, readJobService } from "../src/jobService.js";

export const createJobController = async (req, res, next) => {
  let result = await createJobService(req.body);
  res.status(201).json({
    success: true,
    message: "Job created successfully",
    result: result,
  });
};

export const readJobController = async (req, res, next) => {
  try {
    let result = await readJobService();
    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching job vacancies:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching job vacancies: " + error.message,
    });
  }
};

import {
  createJobService,
  deleteJobService,
  readJobService,
  updateJobService,
} from "../services/jobService.js";

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
export const deleteJobController = async (req, res) => {
  try {
    const { title } = req.body;
    const result = await deleteJobService(req.body);

    if (result > 0) {
      res.status(200).json({ message: "Job vacancy deleted successfully." });
    } else {
      res.status(404).json({ message: "Job vacancy not found." });
    }
  } catch (error) {
    console.error("Error deleting job vacancy:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the job vacancy." });
  }
};

export const updateJobController = async (req, res) => {
  try {
    const data = req.body;
    const updatedRows = await updateJobService(data);
    if (updatedRows > 0) {
      res
        .status(200)
        .json({ message: "Job vacancy updated successfully", updatedRows });
    } else {
      res
        .status(404)
        .json({ message: "No job vacancy found with the specified title" });
    }
  } catch (error) {
    console.error("Error in updateJobController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

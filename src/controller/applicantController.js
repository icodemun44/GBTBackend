import { deleteApplicantService, readApplicantService } from "../services/applicantService.js";

export const readApplicantController = async (req, res, next) => {
  try {
    let result = await readApplicantService();
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

export const deleteApplicantController = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await deleteApplicantService(req.body);

    if (result > 0) {
      res.status(200).json({ message: "Applicant deleted successfully." });
    } else {
      res.status(404).json({ message: "Applicant not found." });
    }
  } catch (error) {
    console.error("Error deleting applicant:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the applicant." });
  }
};

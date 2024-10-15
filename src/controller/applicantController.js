import { readApplicantService } from "../services/applicantService.js";

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

import pool from "../../db.js";

export const readApplicantService = async () => {
  const result = await pool.query("SELECT * FROM applicant_data");
  return await result;
};


export const deleteApplicantService = async(data) => {
  try {
    const result = await pool.query(
      "DELETE FROM applicant_data WHERE name = $1",
      [data.name]
    );
    return result.rowCount;
  } catch (error) {
    console.error("Error deleting applicant:", error);
    throw error;
  }
}
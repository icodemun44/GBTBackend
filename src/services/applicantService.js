import pool from "../../db.js";

export const readApplicantService = async () => {
  const result = await pool.query("SELECT * FROM applicant_data");
  return await result;
};

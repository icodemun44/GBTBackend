import pool from "../db.js";

export const createJobService = async (data) => {
  const { job_title, description, requirements, about_job } = data;
  try {
    const result = await pool.query(
      `INSERT INTO job_vacancies (job_title, description, requirements, about_job)
             VALUES ($1, $2, $3, $4)
             RETURNING *`, // Return the inserted row
      [job_title, description, requirements, about_job] // The values to insert
    );

    return result.rows[0];
  } catch (error) {
    console.error("Error inserting job vacancy:", error);
    throw error;
  }
};

export const readJobService = async () => {
  const result = await pool.query("SELECT * FROM job_vacancies");
  return await result;
};

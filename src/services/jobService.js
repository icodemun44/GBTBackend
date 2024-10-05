import pool from "../../db.js";

export const createJobService = async (data) => {
  const { job_title, description, requirements, about_job, deadline } = data;
  try {
    const result = await pool.query(
      `INSERT INTO job_vacancies (job_title, description, requirements, about_job, deadline)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`, // Return the inserted row
      [job_title, description, requirements, about_job, deadline] // The values to insert
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

export const deleteJobService = async (data) => {
  try {
    const result = await pool.query(
      "DELETE FROM job_vacancies WHERE job_title = $1",
      [data.job_title]
    );
    return result.rowCount;
  } catch (error) {
    console.error("Error deleting job vacancy:", error);
    throw error;
  }
};

export const updateJobService = async (data) => {
  try {
    const result = await pool.query(
      `UPDATE job_vacancies
       SET job_title = $1,
           description = $2,
           requirements = $3,
           about_job = $4,
           deadline = $5
       WHERE job_title = $6`,
      [
        data.job_title,
        data.description,
        data.requirements,
        data.about_job,
        data.deadline,
        data.old_job_title,
      ]
    );
    return result.rowCount;
  } catch (error) {
    console.error("Error updating job vacancy:", error);
    throw error;
  }
};

export const getJobByTitleService = async (title) => {
  try {
    const result = await pool.query(
      "SELECT * FROM job_vacancies WHERE job_title = $1",
      [title]
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching job by title:", error);
    throw error;
  }
};

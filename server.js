import express from "express";
import cors from "cors";
import { email } from "./constant.js";
import jobRouter from "./src/router/jobRouter.js";
import { sendEmail } from "./src/utils/sendEmail.js";
import { upload } from "./src/utils/uploadFile.js";
import pool from "./db.js";
import applicantRouter from "./src/router/applicantRouter.js";

const app = express();
const PORT = 8000;
app.use(cors());

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to handle form submission
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Sending email using sendEmail function
    await sendEmail({
      from: `"${name}" <${email}>`,
      to: "rukeshkhatiwada849@gmail.com",
      subject: "Customer Form",
      html: `
        <h1>New Customer Details</h1>
        <p><b>Name:</b>${name}</p>
        <p><b>Email:</b>${email}</p>
        <p><b>Message:</b>${message}</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Form submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting form:", error.message);
    res.status(500).json({
      success: false,
      message: "Error submitting form: " + error.message,
    });
  }
});

app.post("/job-apply", upload.single("cv"), async (req, res) => {
  const file = req.file;
  const jobName = req.body.jobName;
  const applicantName = req.body.name;
  const applicantEmail = req.body.email;
  try {
    if (!file) {
      return res
        .status(400)
        .send({ success: false, message: "No file uploaded" });
    } else {
      await sendEmail({
        from: `"Job Applicant" <${applicantEmail}>`,
        to: "rukeshkhatiwada849@gmail.com",
        subject: "CV Submission",
        html: `
          <h1>Job Application</h1>
          <h3>Job Post: ${jobName}</h3>
        `,
        attachments: [
          {
            filename: file.originalname,
            content: file.buffer, // Use the buffer for the attachment
          },
        ],
      });
      await pool.query(
        `INSERT INTO applicant_data (name, email, job)
               VALUES ($1, $2, $3)
               RETURNING *`, // Return the inserted row
        [applicantName, applicantEmail, jobName]
      );
      res.status(200).send({
        success: true,
        message:
          "Your application has been submitted successfully! We will get back to you via the email address provided in your CV as soon as possible.",
      });
    }
  } catch (error) {
    console.error("Error during file upload:", error.message);
    res.status(500).send({
      success: false,
      message: "Error uploading file: " + error.message,
    });
  }
});

app.use("/job", jobRouter);
app.use("/applicant", applicantRouter);

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// index.js
import express from "express";
import cors from "cors";
import { sendEmail } from "./sendEmail.js"; // Assuming this is the correct path for sendEmail

const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Route to handle form submission
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Sending email using sendEmail function
    await sendEmail({
      from: `"${name}" <${email}>`,
      to: "rukeshkhatiwada849@gmail.com", // Replace with the intended recipient email
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

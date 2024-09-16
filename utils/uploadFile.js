import multer from "multer";
import path from "path";
import fs from "fs";

// Define the directory path for file uploads
const uploadDir = path.join(process.cwd(), "uploads");

// Ensure the uploads directory exists; create it if it doesn't
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // You can modify the filename as needed
  },
});

// Define fileFilter to check file type
const fileFilter = (req, file, cb) => {
  // Allowed file extensions
  const allowedFileTypes = /pdf|doc|docx/;

  // Check the file extension
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  // Check the MIME type
  const allowedMimes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const mimetype = allowedMimes.includes(file.mimetype);

  if (extname && mimetype) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only .pdf, .doc, and .docx files are allowed!")); // Reject the file
  }
};
// Create the multer upload instance with storage and fileFilter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

export default upload;

import multer from "multer";
import path from "path";

// Configure Multer storage to use memory
const storage = multer.memoryStorage();

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

// Create the multer upload instance with memory storage and fileFilter
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});


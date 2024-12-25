const express = require("express");
const app = express();
const kycController = require("../controllers/index");
const router = express.Router();
const multer = require("multer");

// Configure multer for file storage
const upload = multer({ dest: "uploads/" });

// Route to handle file and text data
router.post("/", upload.array("files", 5), (req, res) => {
  // Get text data (e.g., username)
  const username = req.body.firstName;

  // Get files from req.files (Array of uploaded files)
  const files = req.files;

  if (!username || !files || files.length === 0) {
    return res.status(400).json({ message: "Username and files are required" });
  }

  // Log the received data (can be stored or processed as needed)
  console.log("Username:", username);
  console.log("Uploaded Files:", files);

  // Send response back to the client
  res.json({
    message: "Files and data uploaded successfully",
    username,
    files: files.map((file) => ({
      originalName: file.originalname,
      path: file.path,
    })),
  });
});
router.get("/:verifId", (req, res) => kycController.getVerification(req, res));

module.exports = router;

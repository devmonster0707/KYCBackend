const express = require("express");
const app = express();
const kycController = require("../controllers/index");
const router = express.Router();
const multer = require("multer");

// Configure multer for file storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route to handle file uploads and forward to KYC service
router.post(
  "/",
  upload.fields([{ name: "passport" }, { name: "selfie" }]),
  (req, res) => {
    kycController.createVerification(req, res);
  }
);
router.get("/:verifId", (req, res) => kycController.getVerification(req, res));

module.exports = router;

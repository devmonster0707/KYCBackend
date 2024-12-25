const express = require("express");
const router = require("./routes");
const app = express();

const apiToken = "9967e527197ea04e8a1af992ab7303b357ba";
const formId = "b548341a1dab0045d6283f13c34d03842f1f";
// Serve static files (like index.html)

app.use(express.static("public"));
// Body parser middleware for form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", router);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

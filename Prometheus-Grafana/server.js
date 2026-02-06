const express = require("express");
const app = express();

// Serve static files
app.use(express.static("public"));

// Home Route
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});


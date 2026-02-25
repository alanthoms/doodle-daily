const express = require("express");
const app = express();
const PORT = 3001;

app.get("/", (req, res) => {
  res.send("Doodle Daily API is running!");
});

app.listen(PORT, () => {
  console.log(`✅ Server is vibrating on http://localhost:${PORT}`);
});

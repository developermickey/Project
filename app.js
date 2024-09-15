const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Welcome to the Express.js Server!");
});

app.listen(port, () => {
  console.log(`Server Running Of Port ${port}`);
});

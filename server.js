const express = require("express");
const cors = require("cors");
const path = require("path");
const serveStatic = require("serve-static");

const app = express();

app.use(cors());
app.use(serveStatic(path.resolve(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server has been started on ${process.env.PORT || 8080}`);
});

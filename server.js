const express = require("express");
const bodyParser = require("body-parser");
const validUrl = require("valid-url");
const path = require("path");
const config = require("./config");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.get("/new/*", (req, res) => {
  const url = req.params[0];
  if (!validUrl.isWebUri(url)) {
    res.status(400).json({ error: "Invalid url" });
    return;
  }
  res.json({ url });
});
app.listen(PORT, () => console.log(`Running on port ${PORT}`));

module.exports = app;

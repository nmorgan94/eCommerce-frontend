const express = require("express");
const path = require("path");
const app = express();

const environemnt = process.env.REACT_APP_ENVIRONMENT || "local";
var cors = require("cors");

app.get("/products", (req, res) => {
  res.send(`YOUR EXPRESS BACKEND IS ${environemnt}`);
});

app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

app.listen(5000, () => console.log(`Server is listening on 5000`));

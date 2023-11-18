const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const dbConnect = require("./connection/db");
const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:4200",
  })
);
require("dotenv").config({ path: "./config.env" });

// data base connection
dbConnect();

// api
app.use("/", require("./routes/user"));
app.use("/", require("./routes/post"));
// listen
const port = process.env.PORT || 2023;
const server = app.listen(port, () => {
  console.log(`server is runing at http://localhost:${port}`);
});

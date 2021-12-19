const express = require("express");
// const { path } = require("express/lib/application");
const { configEnv } = require("./src/config");
const { rootRouter } = require("./src/router/root.router");
const app = express();
const path = require("path");
require("dotenv").config();

// setup định dạng body thành json
app.use(express.json());

// Setup static File
const pathPublicDirectory = path.join(__dirname, "./public");
// console.log(pathPublicDirectory);
// http://localhost:3000<=>Folder  Public
app.use(express.static(pathPublicDirectory))


//http://localhost:3000/api/v1
app.use("/api/v1", rootRouter);

//http://localhost:3000
const port = configEnv.server.port;
// console.log(port);

app.listen(port, () => {
  console.log("My app run on http:localhost:" + port);
});

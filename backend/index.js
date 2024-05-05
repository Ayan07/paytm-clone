const express = require("express");
const { default: mongoose } = require("mongoose");
const { DB_URL, DB_PORT } = require("./db");
const rootRouter = require("./routes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

app.listen(3000, () => {
  console.log(`App listening on port 3000`);
});

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes/blogRoutes.js");
// const blogRoutes = require("./blogRoute");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;
const dbUri = process.env.MONGODB_URI;

mongoose.connect(dbUri, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  dbName: process.env.DB_NAME || "merndata",
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(cors());
app.use(bodyParser.json());

app.use("/api",router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

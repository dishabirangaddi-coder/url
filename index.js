const express = require("express");
const connectMongoDB = require("./connect");
require("dotenv").config();

const urlRoutes = require("./routers/url");

const app = express();
const mongoURL = process.env.MONGO_URL;

connectMongoDB(mongoURL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });



app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRoutes);
const URL = require("./models/url");

app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  const allUrls = await URL.find({});
  res.render("home", {
    urls: allUrls,
  });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

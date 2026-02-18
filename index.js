const express = require("express");
const connectMongoDB = require("./connect");
const urlRoutes = require("./routers/url");

const app = express();

const url = "mongodb://localhost:27017/urlshortner";

connectMongoDB(url)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

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

app.listen(8000, () => {
  console.log("Server running on port 8000");
});

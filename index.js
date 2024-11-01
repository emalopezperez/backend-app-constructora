const express = require("express");
const connectDB = require("./config/moongodb.js");
const connectCloudinary = require("./config/cloudinary");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/admin-routes");
const postRoutes = require("./routes/post-routes");

require("dotenv").config();

const app = express();
app.use(cookieParser());
connectDB();
connectCloudinary();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS", "PUT", "HEAD"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Origin",
      "X-Requested-With",
      "Accept",
    ],
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

const PORT = 3001;

app.use("/api/post", postRoutes);
app.use("/api/auth/admin", authRouter);

app.listen(PORT, () => console.log("Server is running on port", PORT));

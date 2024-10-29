const express = require("express");
const connectDB = require("./config/moongodb.js");
const connectCloudinary = require("./config/cloudinary");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/admin-routes");
const postRoutes = require("./routes/post-routes");

require("dotenv").config();
const isProduction = process.env.NODE_ENV === "production";

const app = express();
app.use(cookieParser());
connectDB();
connectCloudinary();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: isProduction
      ? "https://tu-dominio-produccion.com"
      : "http://localhost:3000",
    credentials: true,
  })
);

const PORT = 8000;

app.use("/api/post", postRoutes);
app.use("/api/auth/admin", authRouter);

app.listen(PORT, () => console.log("Server is running"));

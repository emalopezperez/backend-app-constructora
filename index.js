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
    origin:
      "https://backend-app-constructora-lasvou9em-emalopezperezs-projects.vercel.app/",
    credentials: true,
  })
);

const PORT = 3001;

app.use("/api/post", postRoutes);
app.use("/api/auth/admin", authRouter);

app.listen(PORT, () => console.log("Server is running"));

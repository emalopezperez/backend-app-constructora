const express = require("express");
const connectDB = require("./config/moongodb.js");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const cors = require("cors");
const bookRouter = require("./routes/book-routes.js");
const reviewRouter = require("./routes/review-route.js");
const userRouter = require("./routes/user-routes.js");
const authRouter = require("./routes/admin-routes");

require("dotenv").config();

const app = express();
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PORT = 5000;

app.use("/public/book", bookRouter);
app.use("/auth/user/books", reviewRouter);
app.use("/auth/user", userRouter);
app.use("/auth/admin", authRouter);

app.listen(PORT, () => console.log("Server is running"));

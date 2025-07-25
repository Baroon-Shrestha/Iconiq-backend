require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const loginRoutes = require("./Routes/authRoutes");
const chatRoutes = require("./Routes/chatRoutes");
const sessionRoutes = require("./Routes/sessionRoutes");
const blogRoutes = require("./Routes/blogRoutes");

const fileUpload = require("express-fileupload");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://full-stack-iconiq.vercel.app",
  "https://iconiq-frontend.vercel.app",
  "https://iconiq-frontend-cacjln3hl-baroon-shresthas-projects.vercel.app/",
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp/",
  })
);

app.use("/admin", loginRoutes);
app.use("/admin", chatRoutes);
app.use("/admin", sessionRoutes);

app.use("/blog", blogRoutes);

module.exports = app;

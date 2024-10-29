import express, { json } from "express";
import authRouter from "./routes/authRoute.js";
import { bookRouter } from "./routes/bookRoute.js";
import { userRoute } from "./routes/userRoute.js";
import { order } from "./routes/orderRoute.js";
import { otpAndMail } from "./routes/passwordResetRoute.js";
import { contactUs } from "./routes/contactUsRoute.js";

import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';
const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//-------------------------------------------------------------------------------

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/auth", authRouter);
app.use("/book", bookRouter);
app.use("/user", userRoute);
app.use("/order", order);
app.use("/reset", otpAndMail);
app.use("/contactUS", contactUs);
//-------------------------------------------------------------------------------

app.listen(port);

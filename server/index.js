import express, { json } from "express";
import authRouter from "./routes/authRoute.js";
import { bookRouter } from "./routes/bookRoute.js";
import { userRoute } from "./routes/userRoute.js";
import { order } from "./routes/orderRoute.js";
import { otpAndMail } from "./routes/passwordResetRoute.js";
import cors from "cors";

const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());

//-------------------------------------------------------------------------------

app.use("/auth", authRouter);
app.use("/book", bookRouter);
app.use("/user", userRoute);
app.use("/order", order);
app.use("/reset", otpAndMail);
//-------------------------------------------------------------------------------

app.listen(port);

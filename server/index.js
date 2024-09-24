import express, { json } from "express";
import authRouter from "./routes/authRoute.js";
import { bookRouter } from "./routes/bookRoute.js";
import { userRoute } from "./routes/userRoute.js";
import cors from 'cors'
// import { Book } from "./models/userQueries.js";

const app = express();
const port = 8080;
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

//-------------------------------------------------------------------------------

/**Add a new book to the store database*/
app.use("/auth", authRouter);
app.use("/book", bookRouter);
app.use("/user",userRoute)
//-------------------------------------------------------------------------------

app.listen(port);

import express, { Request, Response } from "express";
import cors from "cors"
import dotenv from "dotenv"
import routes from "./routes";
import errorHandler from "./middlewares/error-handler.middleware";

const app = express();
dotenv.config({})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", routes);

app.use(errorHandler) // Error handler middle ware

app.listen(3001, () => {
    console.log("Server is running on port 3001")
})
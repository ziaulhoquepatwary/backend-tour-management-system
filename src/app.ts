import express from "express";
import type { Application, Request, Response } from 'express';
import cors from "cors"
import { router } from "./app/routes/index.js";


const app: Application = express();

app.use(express.json());
app.use(cors())

app.use("/api/v1/",  router)

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Tour Management System")
})

export default app;
import express from "express";
import type { Application, Request, Response } from 'express';
import { UserRoutes } from "./app/modules/user/user.route.js";
import cors from "cors"


const app: Application = express();

app.use(express.json());
app.use(cors())

app.use("/api/v1/user",  UserRoutes)

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Tour Management System")
})

export default app;
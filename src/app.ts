import express from "express";
import type { Application, Request, Response } from 'express';


const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to Tour Management System")
})

export default app;
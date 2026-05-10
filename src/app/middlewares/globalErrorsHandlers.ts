/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextFunction, Request, Response } from "express"
import { envVars } from "../config/env.js"


export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = 500;
    const message = `Something went wrong!! ${err.message} from Global Error`

    res.status(statusCode).json({
        success: false,
        message,
        stack: envVars.NODE_ENV === "development" ? err.stack : null
    })
}
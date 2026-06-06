/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextFunction, Request, Response } from "express"
import { envVars } from "../config/env.js"
import AppError from "../errorHelpers/AppError.js";


export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = 500;
    const message = `Something went wrong!! ${err.message} from Global Error`


    // if (err instanceof AppError) {
    //     statusCode = err.statusCode
    //     message = err.message
    // } else if (err instanceof Error) {
    //     statusCode = 500;
    //     message = err.message
    // }

    res.status(statusCode).json({
        success: false,
        message,
        stack: envVars.NODE_ENV === "development" ? err.stack : null
    })
}
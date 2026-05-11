/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextFunction, Request, Response } from "express";
import httpStatusCode from "http-status-codes";
import { UserServices } from "./user.service.js";
import { catchAsync } from "../../utils/catchAsync.js";


const createUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body)

    res.status(httpStatusCode.CREATED).json({
        message: "User Created Successfully",
        user
    })
})

const getAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const users = await UserServices.getAllUsers();

    res.status(httpStatusCode.OK).json({
        success: true,
        message: "All Users Retrieved Successfully",
        data: users
    })
})

export const userControllers = {
    createUser,
    getAllUsers
}
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from "express"
import { catchAsync } from "../../utils/catchAsync.js"
import { sendResponse } from "../../utils/sendResponse.js"
import httpStatusCode from "http-status-codes"
import { AuthServices } from "./auth.service.js"

const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const loginInfo = await AuthServices.credentialsLogin(req.body)

    sendResponse(res, {
        success: true,
        statusCode: httpStatusCode.CREATED,
        message: "User Logged in Successfully",
        data: loginInfo
    })
})

export const AuthControllers = {
    credentialsLogin
}
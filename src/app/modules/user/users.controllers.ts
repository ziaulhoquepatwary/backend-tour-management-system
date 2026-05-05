/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from "express";
import { User } from "./users.model.js";
import httpStatusCode from "http-status-codes";


const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email } = req.body;

        const user = await User.create({
            name,
            email,
        })

        res.status(httpStatusCode.CREATED).json({
            message: "User Created Successfully",
            user
        })
    } catch (err: any) {
        console.log(err);
        res.status(httpStatusCode.BAD_REQUEST).json({
            message: `Something went wrong!! ${err.emssage}`,
            err
        })
    }
}

export const userControllers = {
    createUser
}
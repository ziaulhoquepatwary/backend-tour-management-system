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

const getAllUsers = async (req: Request, res: Response) => {
    const query = req.query;

    res.status(httpStatusCode.OK).json({
        success: true,
        message: "All Users Retrieved Successfully",
        data: query
    })

}

export const userControllers = {
    createUser,
    getAllUsers
}
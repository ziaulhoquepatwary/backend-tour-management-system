import AppError from "../../errorHelpers/AppError.js";
import type { IUser } from "../user/user.interfaces.js";
import httpStatus from "http-status-codes";
import { User } from "../user/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const credentialsLogin = async (payload: Partial<IUser>) => {
    const { email, password } = payload;

    const isUserExist = await User.findOne({ email })

    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist");
    }

    const isPasswordMatched = await bcrypt.compare(password as string, isUserExist.password as string)

    if (isPasswordMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
    }

    const jwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    }

    const accessToken = jwt.sign(jwtPayload, "sectet", { expiresIn: "1d" })

    return {
        accessToken
    }
}

export const AuthServices = {
    credentialsLogin
}
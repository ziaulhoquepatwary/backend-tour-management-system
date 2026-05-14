import AppError from "../../errorHelpers/AppError.js";
import type { IUser } from "../user/user.interfaces.js";
import httpStatus from "http-status-codes";
import { User } from "../user/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../../utils/jwt.js";
import { envVars } from "../../config/env.js";

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

    // const accessToken = jwt.sign(jwtPayload, "sectet", { expiresIn: "1d" })
    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)

    return {
        accessToken
    }
}

export const AuthServices = {
    credentialsLogin
}
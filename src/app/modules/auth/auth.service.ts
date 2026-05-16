import AppError from "../../errorHelpers/AppError.js";
import type { IUser } from "../user/user.interfaces.js";
import httpStatus from "http-status-codes";
import { User } from "../user/users.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../../utils/jwt.js";
import { envVars } from "../../config/env.js";
import { createUserTokens } from "../../utils/userTokens.js";

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

    const userTokens = createUserTokens(isUserExist)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass, ...rest } = isUserExist.toObject();

    return {
        accessToken: userTokens.accessToken,
        refreshToken: userTokens.refreshToken,
        user: rest
    }
}

export const AuthServices = {
    credentialsLogin
}
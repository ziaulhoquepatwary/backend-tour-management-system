import AppError from "../../errorHelpers/AppError.js";
import type { IUser } from "../user/user.interfaces.js";
import httpStatus from "http-status-codes";
import { User } from "../user/users.model.js";
import bcrypt from "bcryptjs";

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

    return {
        email: isUserExist.email
    }
}

export const AuthServices = {
    credentialsLogin
}
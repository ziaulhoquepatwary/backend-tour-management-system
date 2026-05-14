import AppError from "../../errorHelpers/AppError.js";
import type { IAuthProvider, IUser } from "./user.interfaces.js";
import { User } from "./users.model.js";
import httpStatus from "http-status-codes";
import bcrypjs from "bcryptjs";
import { envVars } from "../../config/env.js";

const createUser = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;

    const isUserExist = await User.findOne({ email })

    if (isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist");
    }

    const hashePassword = await bcrypjs.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND))

    const authProvider: IAuthProvider = { provider: "credentials", providerId: email as string }

    const user = await User.create({
        email,
        password: hashePassword,
        auths: [authProvider],
        ...rest
    })

    return user
}

const getAllUsers = async () => {
    const users = await User.find({});

    const total = await User.countDocuments()

    return {
        data: users,
        meta: {
            total
        }
    };
}

export const UserServices = {
    createUser,
    getAllUsers
}
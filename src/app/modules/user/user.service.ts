import type { IUser } from "./user.interfaces.js";
import { User } from "./users.model.js";

const createUser = async (payload: Partial<IUser>) => {
    const { name, email } = payload;

    const user = await User.create({
        name,
        email
    })

    return user
}

export const UserServices = {
    createUser
}
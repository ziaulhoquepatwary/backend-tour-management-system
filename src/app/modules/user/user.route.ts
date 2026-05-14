import { Router, type NextFunction, type Request, type Response } from "express";
import { userControllers } from "./users.controllers.js";
import { createUserZodSchema } from "./user.validation.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import AppError from "../../errorHelpers/AppError.js";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { Role } from "./user.interfaces.js";


const router = Router()

router.post("/register", validateRequest(createUserZodSchema), userControllers.createUser)
router.get("/all-users", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization;

        if (!accessToken) {
            throw new AppError(403, "No Token Recived")
        }

        const verifiedToken = jwt.verify(accessToken, "secret")

        if (!verifiedToken) {
            throw new AppError(403, "You are not authorized")
        }

        if ((verifiedToken as JwtPayload).role !== Role.ADMIN) {
            throw new AppError(403, "You are not parmitted to view this route!!!")
        }

        console.log(verifiedToken);

        next();
    } catch (error) {
        next(error)
    }
}, userControllers.getAllUsers)

export const UserRoutes = router;
import { Router } from "express";
import { userControllers } from "./users.controllers.js";
import { createUserZodSchema } from "./user.validation.js";
import { validateRequest } from "../../middlewares/validateRequest.js";


const router = Router()

router.post("/register", validateRequest(createUserZodSchema), userControllers.createUser)
router.get("/all-users", userControllers.getAllUsers)

export const UserRoutes = router;
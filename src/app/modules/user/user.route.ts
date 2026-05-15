import { Router } from "express";
import { userControllers } from "./users.controllers.js";
import { createUserZodSchema } from "./user.validation.js";
import { validateRequest } from "../../middlewares/validateRequest.js";
import { Role } from "./user.interfaces.js";
import { checkAuth } from "../../middlewares/checkAuth.js";


const router = Router()

router.post("/register", validateRequest(createUserZodSchema), userControllers.createUser)
router.get("/all-users", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), userControllers.getAllUsers)
router.patch("/:id", checkAuth(...Object.values(Role)), userControllers.updateUser)

export const UserRoutes = router;
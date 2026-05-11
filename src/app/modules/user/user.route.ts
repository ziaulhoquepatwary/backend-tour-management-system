import { Router } from "express";
import { userControllers } from "./users.controllers.js";


const router = Router()

router.post("/register", userControllers.createUser)
router.get("/all-users", userControllers.getAllUsers)

export const UserRoutes = router;
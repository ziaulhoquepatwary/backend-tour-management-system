import { Router } from "express";
import { userControllers } from "./users.controllers.js";


const router = Router()

router.post("/register", userControllers.createUser)

export const UserRoutes = router;
import express = from "express");
import authRouter = express.Router();

import authController = from "../controllers/auth.controller");

authRouter.post("/login", authController.login);

export default authRouter;

import { Router } from "express";
import { register, login, logout, getMe, verifyEmail, quickLogin } from "../controller/auth.controller.js";
import {authUser} from "../middleware/auth.middleware.js";
import { registerValidator, loginValidator } from "../validator/auth.validator.js";




const authRouter = Router();


authRouter.post("/register", registerValidator, register);
authRouter.post("/login", loginValidator, login);
authRouter.post("/logout", authUser, logout);
authRouter.get("/me", authUser, getMe);
authRouter.get("/verify-email", verifyEmail);
authRouter.get("/quick-login", quickLogin);

export default authRouter;
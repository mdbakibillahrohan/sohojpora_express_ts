import { Router } from "express";
import { validateRequest } from "../../../shared/middleware/validators/requestValidator";
import { loginHandler, LoginRequest, loginValidationSchema } from "../handlers/login.handlers";
import { registerHandler, RegisterRequest, registerValidationSchema } from "../handlers/regiser.handler";

const authRouter = Router();

authRouter.post(
  "/login",
  validateRequest<LoginRequest>(loginValidationSchema),
  loginHandler,
);
authRouter.post(
  "/register",
  validateRequest<RegisterRequest>(registerValidationSchema),
  registerHandler,
);

export default authRouter;

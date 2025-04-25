import { Router } from "express";
import { validateRequest } from "../../../shared/middleware/validators/requestValidator";
import { loginHandler, LoginRequest, loginValidationSchema } from "../handlers/login.handlers";

const authRouter = Router();

authRouter.post(
  "/login",
  validateRequest<LoginRequest>(loginValidationSchema),
  loginHandler,
);

export default authRouter;

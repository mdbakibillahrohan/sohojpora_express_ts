import { Router } from "express";
import { validateRequest } from "../../../shared/middleware/validators/requestValidator";
import createUserTypeHandler, { createUserTypeValidationSchema } from "../handlers/user-type/create-user-type.handler";


const userModuleRouter = Router();

userModuleRouter.post("/user-type", validateRequest(createUserTypeValidationSchema), createUserTypeHandler);


export default userModuleRouter;
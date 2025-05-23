import { Router } from "express";
import { validateRequest } from "../../../shared/middleware/validators/requestValidator";
import createUserTypeHandler, { createUserTypeValidationSchema } from "../handlers/user-type/create-user-type.handler";
import getUserInfoHandler from "../handlers/user/get-user-info.handler";


const userModuleRouter = Router();

userModuleRouter.get("/user-info", getUserInfoHandler);

userModuleRouter.post("/user-type", validateRequest(createUserTypeValidationSchema), createUserTypeHandler);



export default userModuleRouter;
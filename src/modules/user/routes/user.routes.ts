import { Router } from "express";
import { validateRequest } from "../../../shared/middleware/validators/requestValidator";
import createUserTypeHandler, { createUserTypeValidationSchema } from "../handlers/user-type/create-user-type.handler";
import getUserInfoHandler from "../handlers/user/get-user-info.handler";
import {createUserDeviceValidationSchema,  createUserDeviceHandler,getUserDeviceWithIdHandler,getUserDeviceWithUserIdHandler} from '../../common/handlers/user-device.handler';
import {authenticateToken} from '../../../shared/middleware/auth/authenticateToken';
import {createUserInstituteInfoValidationSchema,createUserInstituteInfoHandler,updateUserInstituteInfoHandler,deleteUserInstituteInfo,getUserInstituteInfoByIdHandler,getUserInstituteInfosByUserIdHandler} from '../../common/handlers/user-institute-info.handler';
import{
    createUserLoginHistoryValidationSchema,
    createUserLoginHistoryHandler,deleteUserLoginHistoryHandler,
    getUserLoginHistoryByUserIdHandler,getUserLoginHistoryByTokenHandler,
    getUserLoginHistoryByIdHandler
}from '../../common/handlers/user-login-history.handler'

import {
    createUserOtpHistoryValidationSchema,createUserOtpHistoryHandler,
    getUserOtpHistoryByIdHandler,deleteUserOtpHistoryHandler,
    getUserOtpHistoryByUserIdHandler,updateUserOtpHistoryHandler
}from '../../common/handlers/user-otp-history.handler'




const userModuleRouter = Router();

userModuleRouter.get("/user-info", getUserInfoHandler);

userModuleRouter.post("/user-type", validateRequest(createUserTypeValidationSchema), createUserTypeHandler);



//User Device Releted Routes.....>
userModuleRouter.post("/user-device", authenticateToken, validateRequest(createUserDeviceValidationSchema), createUserDeviceHandler);
userModuleRouter.get("/user-device/device/:id", getUserDeviceWithIdHandler);  
userModuleRouter.get("/user-device/user/:userId", getUserDeviceWithUserIdHandler);


//User Institute Info Releted Routes.....>
userModuleRouter.post("/user-institute-info/create", authenticateToken, validateRequest(createUserInstituteInfoValidationSchema), createUserInstituteInfoHandler);
userModuleRouter.put("/user-institute-info/update", authenticateToken, validateRequest(createUserInstituteInfoValidationSchema), updateUserInstituteInfoHandler);
userModuleRouter.delete("/user-institute-info/delete/:Id", authenticateToken, deleteUserInstituteInfo);
userModuleRouter.get("/user-institute-info/institute/:id", authenticateToken, getUserInstituteInfoByIdHandler);
userModuleRouter.get("/user-institute-info/user/:userId", authenticateToken, getUserInstituteInfosByUserIdHandler);



//User Login History Releted Routes....>
userModuleRouter.post("/user-login-history/create", authenticateToken, validateRequest(createUserLoginHistoryValidationSchema),createUserLoginHistoryHandler);
userModuleRouter.delete("/user-login-history/delete/:Id", deleteUserLoginHistoryHandler);
userModuleRouter.get("/user-login-history/byuser", authenticateToken, getUserLoginHistoryByUserIdHandler);
userModuleRouter.get("/user-login-history/token", getUserLoginHistoryByTokenHandler);
userModuleRouter.get("/user-login-history/byid/:id", getUserLoginHistoryByIdHandler)



//User Otp History Releted Routes....>
userModuleRouter.post("/user-otp-history/create", authenticateToken, validateRequest(createUserOtpHistoryValidationSchema), createUserOtpHistoryHandler);
userModuleRouter.put("/user-otp-history/update", authenticateToken, validateRequest(createUserOtpHistoryValidationSchema), updateUserOtpHistoryHandler)
userModuleRouter.delete("/user-otp-history/delete/:Id", deleteUserOtpHistoryHandler);
userModuleRouter.get("/user-otp-history/byuser", getUserOtpHistoryByUserIdHandler);
userModuleRouter.get("/user-otp-history/byid", getUserOtpHistoryByIdHandler);


export default userModuleRouter;
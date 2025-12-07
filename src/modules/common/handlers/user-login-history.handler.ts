import { Request, Response } from "express";
import { container } from "tsyringe";
import {UserLoginHistoryService} from '../service/user-login-history.service';
import { ApiResponse } from "../../../interfaces/ApiResponse";
import { UserLoginHistory } from "../../../entities/user-login-history.entity";
import Joi from "joi";

    


// a validaiton schema for user login history creation
export interface createUserLoginHistorySchema{
    user_id: number;
    device_id: number;
    token: string;
    login_time: Date;
    logout_time: Date;
    expire_time: Date;
    is_access_revoked: boolean;
}

export const createUserLoginHistoryValidationSchema = Joi.object<createUserLoginHistorySchema>({
    user_id: Joi.number().required(),
    device_id: Joi.number().required(),
    token: Joi.string().required(),
    login_time: Joi.date().required(),
    logout_time: Joi.date().required(),
    expire_time:Joi.date().required(),
    is_access_revoked: Joi.boolean().required(),
})




const userLoginHistoryService = container.resolve(UserLoginHistoryService);

//create user Login-History handler
export const createUserLoginHistoryHandler = async (req:Request , res:Response<ApiResponse<UserLoginHistory>>):Promise<void> => {
    
    try{
        const value = req.body;

        const currentUserId = req.user.id ;
        const newUserLoginHistory = new UserLoginHistory();
        newUserLoginHistory.user_id = currentUserId;
        newUserLoginHistory.device_id = value.device_id;
        newUserLoginHistory.token = value.token;
        newUserLoginHistory.login_time = value.login_time;
        newUserLoginHistory.logout_time = value.logout_time; 
        newUserLoginHistory.expire_time = value.expire_time;
        newUserLoginHistory.is_access_revoked = value.is_access_revoked;

        const createdUserLoginHistory = await userLoginHistoryService.createUserLoginHistory(newUserLoginHistory);

        res.status(201).json({
            message: "User login-history created successfully",
            data: createdUserLoginHistory,
            success: true,
            status_code: 201
        });

    }catch(error){
        console.error("Error creating user-login-history:", error);
        res.status(500).json({
            message: "Internal server error",
            data: null,
            success: false,
            status_code: 500
        });
        
    }
}



//get user login history by user Id handler 
export const getUserLoginHistoryByUserIdHandler = async (req:Request , res:Response<ApiResponse<{userLoginHistory:UserLoginHistory[]}>>) => {
    const userId = req.user.id;
    const offset = Number(req.query.offset) || 0 ;
    const limit = Number(req.query.limit) || 10 ;

    const getUserLoginHistoryByUserId = await userLoginHistoryService.getUserLoginHistoryByUserId(userId,offset,limit);
    res.status(200).json({
        message: "User login history retrived successfully via user Id",
        data: getUserLoginHistoryByUserId,
        success: true,
        status_code: 200
    })
}



//delete user login-history handler
export const deleteUserLoginHistoryHandler = async (req:Request , res:Response<ApiResponse<UserLoginHistory>>) => {
    const Id = Number(req.params.Id);

    const deleteUserLoginHistory = await userLoginHistoryService.deleteUserLoginHistory(Id,req.user.id);
    res.status(200).json({
        message: "User Login-History deleted successfully"+deleteUserLoginHistory,
        data: Id && req.user.id,
        success: true,
        status_code: 200
    })
}   


// get user login-history by id handler
export const getUserLoginHistoryByIdHandler = async (req:Request , res:Response<ApiResponse<UserLoginHistory | null>>) => {
    const id = Number(req.params.id);

    const getUserLoginHistoryById = await userLoginHistoryService.getUserLoginHistoryById(id);
    if (!getUserLoginHistoryById) {
        res.status(404).json({
            message: "User Login-history  not found",
            data: null,
            success: false,
            status_code: 404
        });
    }

    res.status(200).json({
        message: "User Login-History retrieved via id successfully",
        data: getUserLoginHistoryById,
        success: true,
        status_code: 200
    });

}



// get user login-history by token handler
export const getUserLoginHistoryByTokenHandler = async (req:Request , res:Response<ApiResponse<UserLoginHistory | null>>) => {
    const token = req.body.token;   
    
    const userLoginHistoryByToken = await userLoginHistoryService.getUserLoginHistoryByToken(token);
    if(!userLoginHistoryByToken) {
        res.status(404).json({
            message: "User Login-History not found",
            data: null,
            success: false,
            status_code: 404
        });
    }

    res.status(200).json({
        message: "User Login-History retrieved via token successfully",
        data: userLoginHistoryByToken,
        success: true,
        status_code: 200
    });
}   
import { Request, Response } from "express";
import { container } from "tsyringe";
import {UserOtpHistoryService} from '../service/user-otp-history.service';
import { ApiResponse } from "../../../interfaces/ApiResponse";
import { UserOtpHistory } from "../../../entities/user-otp-history.entity";
import Joi from "joi";

    





// a validaiton schema for user otp  creation
export interface createUserOtpHistorySchema{
    user_id: number;
    otp: number;
    expire_time: Date;
    otp_type: 'login' | 'signup' | 'forgot_password';
    is_verified: boolean;
    is_used: boolean;
    is_expired:boolean;
}

export const createUserOtpHistoryValidationSchema = Joi.object<createUserOtpHistorySchema>({
    user_id: Joi.number().required(),
    otp: Joi.number().required(),
    expire_time: Joi.date().required(),
    otp_type: Joi.string().required(),
    is_verified: Joi.boolean().required(),
    is_used:Joi.boolean().required(),
    is_expired: Joi.boolean().required(),
})




const userOtpHistoryService = container.resolve(UserOtpHistoryService);

//create user Otp-History handler
export const createUserOtpHistoryHandler = async (req:Request , res:Response<ApiResponse<UserOtpHistory>>) => {
    
    try{
        const value = req.body;

        const currentUserId = req.user.id ;
        const newUserOtpHistory = new UserOtpHistory;
        newUserOtpHistory.user_id = currentUserId;
        newUserOtpHistory.otp = value.otp;
        newUserOtpHistory.expire_time = value.expire_time;
        newUserOtpHistory.otp_type = value.otp_type;
        newUserOtpHistory.is_verified = value.is_verified; 
        newUserOtpHistory.is_used = value.is_used;
        newUserOtpHistory.is_expired = value.is_expired;

        const createdUserOtpHistory = await userOtpHistoryService.createUserOtp(newUserOtpHistory);

        res.status(201).json({
            message: "User otp-history created successfully",
            data: newUserOtpHistory,
            success: true,
            status_code: 201
        });

    }catch(error){
        console.error("Error creating user-opt-history:", error);
        res.status(500).json({
            message: "Internal server error",
            data: null,
            success: false,
            status_code: 500
        });
        
    }
}



//get user otp history by Id handler 
export const getUserOtpHistoryByIdHandler = async (req:Request , res:Response<ApiResponse<UserOtpHistory | null>>) => {
    const id = Number(req.query.id) ;

    const getUserOtpHistoryById = await userOtpHistoryService.getUserOtpById(id);
    res.status(200).json({
        message: "User otp history retrived successfully via  Id",
        data: getUserOtpHistoryById,
        success: true,
        status_code: 200
    })
}



//delete user otp-history handler
export const deleteUserOtpHistoryHandler = async (req:Request , res:Response<ApiResponse<UserOtpHistory>>) => {
    const Id = Number(req.params.Id);

    const deleteUserOtpHistory = await userOtpHistoryService.deleteUserOtp(Id,req.user.id);
    res.status(200).json({
        message: "User Otp-History deleted successfully ",
        data: Id && req.user.id,
        success: true,
        status_code: 200
    })
}   


// get user otp-history by user id handler
export const getUserOtpHistoryByUserIdHandler = async (req:Request , res:Response<ApiResponse< {userOtpHistory: UserOtpHistory | null }>>) => {

    const getUserOtpHistoryByUserId = await userOtpHistoryService.getUserOtpByUserId(req.user.id);
    if (!getUserOtpHistoryByUserId) {
        res.status(404).json({
            message: "User Otp-history  not found",
            data: null,
            success: false,
            status_code: 404
        });
    }

    res.status(200).json({
        message: "User Otp-History retrieved via user id successfully",
        data: {userOtpHistory:getUserOtpHistoryByUserId},
        success: true,
        status_code: 200
    });

}



// update user otp-history  handler
export const updateUserOtpHistoryHandler = async (req:Request , res:Response<ApiResponse<UserOtpHistory>>) => {
    const id = Number(req.query.id);
    
    const updatedOtpHistory = req.body;

    updatedOtpHistory.otp = Number(req.query.otp);


    await userOtpHistoryService.updateUserOtp(id,updatedOtpHistory);

    res.status(200).json({
        message: "User Otp-History updated successfully",
        data: updatedOtpHistory,
        success: true,
        status_code: 200
    });
}       
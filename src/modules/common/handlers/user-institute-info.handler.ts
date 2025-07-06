import { Request, Response } from "express";
import { container } from "tsyringe";
import {UserInstituteInfoService} from '../service/user-institute-info.service';
import { ApiResponse } from "../../../interfaces/ApiResponse";
import { UserInstituteInfo } from "../../../entities/user-institute-info.entity";
import Joi from "joi";

    


// a validaiton schema for user login history creation
export interface createUserInstituteInfoSchema{
    user_id: number;
    institute_id: number;
    institute_type_id: number;
    start_date: Date;
    end_date: Date;
}

export const createUserInstituteInfoValidationSchema = Joi.object<createUserInstituteInfoSchema>({
    institute_id: Joi.number().required(),
    institute_type_id: Joi.number().required(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required()
})




const userInstituteInfoService = container.resolve(UserInstituteInfoService);

//create user institute-info handler
export const createUserInstituteInfoHandler = async (req:Request , res:Response<ApiResponse<UserInstituteInfo>>):Promise<void> => {
    
    try{
        const value = req.body;

        const currentUserId = req.user.id ;
        const newUserInstituteInfo = new UserInstituteInfo();
        newUserInstituteInfo.user_id = currentUserId;
        newUserInstituteInfo.institute_id = value.institute_id;
        newUserInstituteInfo.institute_type_id = value.institute_type_id;
        newUserInstituteInfo.start_date = value.start_date;
        newUserInstituteInfo.end_date = value.end_date; 
        newUserInstituteInfo.created_by = currentUserId;
        newUserInstituteInfo.updated_by = currentUserId;

        const createdUserInstituteInfo = await userInstituteInfoService.createUserInstituteInfo(newUserInstituteInfo);

        res.status(201).json({
            message: "User institute-info created successfully",
            data: createdUserInstituteInfo,
            success: true,
            status_code: 201
        });

    }catch(error){
        console.error("Error creating user institute-info:", error);
        res.status(500).json({
            message: "Internal server error",
            data: null,
            success: false,
            status_code: 500
        });
        
    }
}



//update user institute-info handler 
export const updateUserInstituteInfoHandler = async (req:Request , res:Response<ApiResponse<UserInstituteInfo>>) => {
    const newUserInstituteInfo = req.body;

    const updateUserInstituteInfo = await userInstituteInfoService.updateUserInstituteInfo(newUserInstituteInfo);
    res.status(200).json({
        message: "User institute-info updated successfully",
        data: updateUserInstituteInfo,
        success: true,
        status_code: 200
    })
}



//delete user institute-info handler
export const deleteUserInstituteInfo = async (req:Request , res:Response<ApiResponse<UserInstituteInfo>>) => {
    const Id = req.params.Id;

    const deleteUserInstituteInfo = await userInstituteInfoService.deleteUserInstituteInfo(Number(Id), req.user.id);
    res.status(200).json({
        message: "User institute info deleted successfully"+deleteUserInstituteInfo,
        data: Id && req.user.id,
        success: true,
        status_code: 200
    })
}   


// get user institute-info by id handler
export const getUserInstituteInfoByIdHandler = async (req:Request , res:Response<ApiResponse<UserInstituteInfo>>) => {
    const id = req.params.id;

    const userInstituteInfo = await userInstituteInfoService.getUserInstituteInfoById(Number(id));
    if (!userInstituteInfo) {
        res.status(404).json({
            message: "User institute-info not found",
            data: null,
            success: false,
            status_code: 404
        });
    }

    res.status(200).json({
        message: "User institute-info retrieved successfully",
        data: userInstituteInfo,
        success: true,
        status_code: 200
    });

}



// get user institute-info by user id handler
export const getUserInstituteInfosByUserIdHandler = async (req:Request , res:Response<ApiResponse<UserInstituteInfo[]>>) => {
    const userId = req.params.userId;   
    
    const userInstituteInfo = await userInstituteInfoService.getUserInstituteInfosByUserId(Number(userId));
    if(!userInstituteInfo || userInstituteInfo.length === 0) {
        res.status(404).json({
            message: "User institute-info not found",
            data: null,
            success: false,
            status_code: 404
        });
    }

    res.status(200).json({
        message: "User institute-info retrieved successfully",
        data: userInstituteInfo,
        success: true,
        status_code: 200
    });
}
import { Request, Response } from "express";
import { container } from "tsyringe";
import {UserDeviceService} from '../service/user-device.service';
import { ApiResponse } from "../../../interfaces/ApiResponse";
import { UserDevice } from "../../../entities/user-device.entity";
import Joi from "joi";




// a validaiton schema for user device creation
export interface createUserDeviceSchema{
    user_id: number;
    device_id: string;
    device_type: string;
    device_name: string;
    device_os: string;
}

export const createUserDeviceValidationSchema = Joi.object<createUserDeviceSchema>({
    user_id: Joi.number().required(),
    device_id: Joi.string().required(),
    device_type: Joi.string().required(),
    device_name: Joi.string().required(),
    device_os: Joi.string().required()
})




const userDeviceService = container.resolve(UserDeviceService);

//create user device handler
export const createUserDeviceHandler = async (req:Request , res:Response<ApiResponse<UserDevice>>) => {
    
    try{
        const value = req.body;

        const currentUserId = req.user.id ;
        const newUserDevice = new UserDevice();
        newUserDevice.user_id = currentUserId;
        newUserDevice.device_id = value.device_id;
        newUserDevice.device_name = value.device_name;
        newUserDevice.mac_address = value.device_id;
        newUserDevice.is_logged_in = true; 

        const createdUserDevice = await userDeviceService.createUserDevice(newUserDevice, currentUserId);

        res.status(201).json({
            message: "User device created successfully",
            data: createdUserDevice,
            success: true,
            status_code: 201
        });

    }catch(error){
        console.error("Error creating user device:", error);
        res.status(500).json({
            message: "Internal server error",
            data: null,
            success: false,
            status_code: 500
        });
        
    }
}



//get user device handler by device id
export const getUserDeviceWithIdHandler = async (req:Request , res:Response<ApiResponse<UserDevice | null>>) => {
    const deviceId = req.params.id;

    const device = await userDeviceService.getUserDeviceById(Number(deviceId));
    res.status(200).json({
        message: "User device retrived successfully",
        data: device,
        success: true,
        status_code: 200
    })
}



//get user device handler by user id
export const getUserDeviceWithUserIdHandler = async (req:Request , res:Response<ApiResponse<UserDevice | null>>) => {
    const userId = req.params.userId;

    const device = await userDeviceService.getUserDeviceByUserId(Number(userId));
    res.status(200).json({
        message: "User device retrived successfully by user id",
        data: device,
        success: true,
        status_code: 200
    })
}   
import { Request, Response } from "express";
import { ApiResponse } from "../../../interfaces/ApiResponse";
import { UserDTO } from "../../user/dtos/user-dto";
import { container } from "tsyringe";
import { AuthService } from "../services/auth.service";
import Joi from "joi";

export interface RegisterRequest {
    id: number;
    user_type_id: number;
    gender_id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    username: string;
    date_of_birth: Date;
    password: string;
}

export interface RegisterResponse {
    user: UserDTO;
}

export const registerValidationSchema = Joi.object<RegisterRequest>({
    user_type_id: Joi.number().required(),
    date_of_birth: Joi.date().required(),
    email: Joi.string().email().required(),
    first_name: Joi.string().min(2).max(50).required(),
    gender_id: Joi.number().required(),
    last_name: Joi.string().min(2).max(50).required(),
    password: Joi.string().min(6).max(20).required(),
    phone_number: Joi.string().min(10).max(15).required(),
    username: Joi.string().min(3).max(20).required(),
});

const authService = container.resolve(AuthService);

export const registerHandler = async (
    req: Request<any, RegisterResponse, RegisterRequest>,
    res: Response<ApiResponse<RegisterResponse>>
): Promise<void> => {
    const userInfo: UserDTO = req.body;

    const userCreated = await authService.regiser(userInfo);
    res.status(201).json({
        message: "User registered successfully",
        data: {
            user: userCreated,
        },
        success: true,
        status_code: 201,
    });
};

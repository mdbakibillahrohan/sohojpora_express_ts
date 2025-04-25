import { Request, Response } from "express";
import { ApiResponse } from "../../../interfaces/ApiResponse";
import Joi from "joi";
import { container } from "tsyringe";
import { AuthService } from "../services/auth.service";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
}

export const loginValidationSchema = Joi.object<LoginRequest>({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
});

const authService = container.resolve(AuthService);

export const loginHandler = async (req: Request, res: Response<ApiResponse<LoginResponse>>): Promise<void> => {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.status(200).json({
        message: "Login successful",
        data: {
            token,
        },
        success: true,
        status_code: 200,
    });
}
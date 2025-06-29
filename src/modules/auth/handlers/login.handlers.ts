import { Request, Response } from "express";
import { ApiResponse } from "../../../interfaces/ApiResponse";
import Joi from "joi";
import { container } from "tsyringe";
import { AuthService } from "../services/auth.service";

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     description: Login user and return a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: email of the user
 *                 example: demo@gmail.com
 *               password:
 *                 type: string
 *                 description: password of the user
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successful
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 status_code:
 *                   type: integer
 *                   example: 200
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid email or password
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 status_code:
 *                   type: integer
 *                   example: 401
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 status_code:
 *                   type: integer
 *                   example: 500
 */

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

export const loginHandler = async (req: Request<any, any, LoginRequest, any>, res: Response<ApiResponse<LoginResponse>>): Promise<void> => {
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
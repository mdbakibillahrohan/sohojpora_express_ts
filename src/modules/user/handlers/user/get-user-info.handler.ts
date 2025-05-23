import { Request, Response } from "express";
import { container } from "tsyringe";
import { ApiResponse } from "../../../../interfaces/ApiResponse";
import { UserRepositories } from "../../repositories/user.repository";
import { NotFoundException } from "../../../../core/AppError";
import { UserDTO } from "../../dtos/user-dto";
import { UserInfoDTO } from "../../dtos/user-info";



export interface GetUserInfoResponse {
    User: UserDTO;
}


const userRepo = container.resolve(UserRepositories);
/**
 * @swagger
 * /api/user-info:
 *   get:
 *     summary: Get logged-in user's information
 *     tags: [User]
 *     description: Retrieves the authenticated user's information
 *     security:
 *       - bearerAuth: []   # Only if using JWT or similar
 *     responses:
 *       200:
 *         description: Successfully retrieved user info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 status_code:
 *                   type: integer
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     User:
 *                       type: object
 */


export const getUserInfoHandler = async (req: Request, res: Response<ApiResponse<GetUserInfoResponse>>): Promise<void> => {



    const loggedInUser = req.user as UserInfoDTO;

    const userInfo = await userRepo.findUserById(loggedInUser.id || 0);



    if (!userInfo) {
        throw new NotFoundException("User not found");
    }

    const user: UserDTO = {
        id: userInfo.id,
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        email: userInfo.email,
        date_of_birth: userInfo.date_of_birth,
        phone_number: userInfo.phone_number,
        username: userInfo.username,
        user_type_id: userInfo.user_type_id,
        gender_id: userInfo.gender_id,
        password: ""
    }

    res.status(200).json({
        success: true,
        status_code: 201,
        message: "User information retrieved successfully",
        data: {
            User: user,
        },
    });
}
export default getUserInfoHandler;

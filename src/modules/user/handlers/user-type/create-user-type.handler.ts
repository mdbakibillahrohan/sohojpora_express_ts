import { Request, Response } from "express";
import Joi from "joi";
import { container } from "tsyringe";
import { UserTypeService } from "../../services/user-type/user-type.service";
import { UserTypeDto } from "../../dtos/user-type.dto";
import { ApiResponse } from "../../../../interfaces/ApiResponse";

export interface CreateUserTypeRequest {
    name: string;
    description: string;
}

export interface CreateUserTypeResponse {
    id: number;
    name: string;
    description: string;
}

export const createUserTypeValidationSchema = Joi.object<CreateUserTypeRequest>({
    name: Joi.string().required(),
    description: Joi.string().optional(),
}).required();


const userTypeService = container.resolve(UserTypeService);

/**
 * @swagger
 * /api/user-type:
 *   post:
 *     summary: Create a new user type
 *     tags: [User Type]
 *     description: Create a new user type
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the user type
 *                 example: Admin
 *               description:
 *                 type: string
 *                 description: Description of the user type
 *                 example: Administrator with full access
 *     responses:
 *       201:
 *         description: User type created successfully
 */
export const createUserTypeHandler = async (req: Request<any, any, CreateUserTypeRequest, any>, res: Response<ApiResponse<CreateUserTypeResponse>>): Promise<void> => {
    const userTypedata: UserTypeDto = {
        id: 0,
        typeName: req.body.name,
        description: req.body.description,
    }
    const userType = await userTypeService.createUserType(userTypedata, 2);

    res.status(201).json({
        success: true,
        status_code: 201,
        message: "User type created successfully",
        data: {
            id: userType.id,
            name: userType.typeName,
            description: userType.description,
        },
    });
}
export default createUserTypeHandler;

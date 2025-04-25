import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";
import { BadRequestException } from "../../../core/AppError";

export const validateRequest = <T>(schema: Schema<T>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            throw new BadRequestException(error.details[0].message);
        }
        next();
    };
}
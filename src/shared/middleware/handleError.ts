import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../core/AppError';
import { ApiResponse } from '../../interfaces/ApiResponse';

export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof AppError) {
    const response: ApiResponse<null> = {
      success: false,
      message: err.message,
      status_code: err.statusCode,
      data: null,
    };
    res.status(err.statusCode).json(response);
  } else {
    console.error('Unexpected error:', err);
    const response: ApiResponse<null> = {
      success: false,
      message: 'Internal server error',
      status_code: 500,
      data: null,
    };
    res.status(500).json(response);
  }
};
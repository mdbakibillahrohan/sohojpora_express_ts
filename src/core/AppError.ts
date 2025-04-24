export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class NotFoundException extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404);
  }
}

export class BadRequestException extends AppError {
  constructor(message = 'Bad request') {
    super(message, 400);
  }
}

export class ForbiddenException extends AppError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

export class UnauthorizedException extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

export class InternalServerErrorException extends AppError {
  constructor(message = 'Internal server error') {
    super(message, 500);
  }
}
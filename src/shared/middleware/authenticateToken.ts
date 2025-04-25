import { Request as ExpressRequest, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';
import { ForbiddenException, UnauthorizedException } from '../../core/AppError';
import { UserDTO } from '../../modules/user/dtos/user-dto';
import { container } from 'tsyringe';
import { JwtService } from '../../modules/auth/services/jwt.service';

interface AuthenticatedRequest extends ExpressRequest {
  user?: UserDTO;
}

const jwtService = container.resolve(JwtService);

export function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    throw new UnauthorizedException('Token not provided');
  }

  req.user = jwtService.verifyToken(token);

  next();
}
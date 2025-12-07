import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { UnauthorizedException } from '../../../core/AppError';
import { UserDTO } from '../../../modules/user/dtos/user-dto';
import { container } from 'tsyringe';
import { JwtService } from '../../../modules/auth/services/jwt.service';
import { UserLoginHistoryRepository } from '../../../modules/user/repositories/user-login-history.repository';

interface AuthenticatedRequest extends ExpressRequest {
  user?: UserDTO;
}

const jwtService = container.resolve(JwtService);
const userloginHistoryRepository = container.resolve(UserLoginHistoryRepository);

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    throw new UnauthorizedException('Token not provided');
  }

  const userLoginHistory = await userloginHistoryRepository.getUserLoginHistoryByToken(token);
  if (!userLoginHistory || userLoginHistory.is_access_revoked) {
    throw new UnauthorizedException('Invalid token');
  }

  const verifiedToken = jwtService.verifyToken(token);

  req.user = verifiedToken;

  next();
}
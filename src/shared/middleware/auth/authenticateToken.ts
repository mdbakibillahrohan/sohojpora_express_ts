// Grouped middleware by functionality into `auth` and `error` subdirectories.
// import { Request, Response, NextFunction } from 'express';
// import { JwtService } from '../../../modules/auth/services/jwt.service';
// import { container } from 'tsyringe';

// export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if(!token){
//         return res.status(401).json({
//             message: 'Access token is missing',
//             success: false,
//             status_code: 401
//         });
//     }

//     const jwtservice = container.resolve(JwtService);
//     try {
//         const user = jwtservice.verifyToken(token);
//         (req as any).user = user;
//         next();

//     } catch(error) {
//         return res.status(401).json({
//             message: 'Invalid access token',
//             success: false,
//             status_code: 401
//         });
//     }
// }
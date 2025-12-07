import Jwt, { SignOptions } from "jsonwebtoken";
import { injectable } from "tsyringe";
import { UserDTO } from "../../user/dtos/user-dto";
import { UnauthorizedException } from "../../../core/AppError";

@injectable()
export class JwtService {
    private secretKey: string;
    private expiresIn: string;

    constructor() {
        this.secretKey = process.env.JWT_SECRET_KEY || "defaultSecretKey";
        this.expiresIn = process.env.JWT_EXPIRES_IN || "1h";
    }

    generateToken(payload: object): string {

        const token = Jwt.sign(payload, this.secretKey);
        return token;
    }

    verifyToken(token: string): UserDTO | undefined {
        try {
            const decoded = Jwt.verify(token, this.secretKey);
            return decoded as UserDTO;
        } catch (error) {
            throw new UnauthorizedException("Invalid token");
        }
    }
    decodeToken(token: string): string | null | Jwt.JwtPayload {
        try {
            const decoded = Jwt.decode(token);
            return decoded;
        } catch (error) {
            throw new Error("Invalid token");
        }
    }

    refreshToken(token: string): string {
        const decoded = this.decodeToken(token);
        if (decoded && typeof decoded === "object") {
            const newToken = this.generateToken(decoded);
            return newToken;
        }
        throw new Error("Invalid token");
    }

    getTokenPayload(token: string): object | null {
        const decoded = this.decodeToken(token);
        if (decoded && typeof decoded === "object") {
            return decoded;
        }
        return null;
    }

    getTokenHeader(token: string): object | null {
        const parts = token.split(".");
        if (parts.length !== 3) {
            throw new Error("Invalid token");
        }
        const header = Buffer.from(parts[0], "base64").toString("utf8");
        return JSON.parse(header);
    }

    getTokenSignature(token: string): string | null {
        const parts = token.split(".");
        if (parts.length !== 3) {
            throw new Error("Invalid token");
        }
        return parts[2];
    }

}
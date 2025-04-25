import { injectable } from "tsyringe";
import { compare, genSalt, hash } from "bcrypt"; // Import bcrypt for password hashing

@injectable()
export class BcryptService {
    async hashPassword(password: string): Promise<string> {

        const salt: string = await genSalt(10);
        const hashedPassword: string = await hash(password, salt);
        if (!hashedPassword) {
            throw new Error("Error hashing password");
        }
        return hashedPassword;
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return compare(password, hashedPassword);
    }
}
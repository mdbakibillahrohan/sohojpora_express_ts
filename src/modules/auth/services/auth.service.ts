
import { injectable } from "tsyringe";
import { UserRepositories } from "../../user/repositories/user.repository";
import { UserDTO } from "../../user/dtos/user-dto";
import { User } from "../../../entities/user.entity";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { BcryptService } from "./becrypt.service";
import { BadRequestException, NotFoundException } from "../../../core/AppError";
import { JwtService } from "./jwt.service";

@injectable()
export class AuthService {
  constructor(private userRepository: UserRepositories, private bcryptService: BcryptService, private jwtService: JwtService) { }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const isPasswordValid = await this.bcryptService.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new NotFoundException("Invalid password");
    }
    user.password = ""; // Remove password from the response
    const payload = instanceToPlain(user) as UserDTO;
    const token = this.jwtService.generateToken(payload);
    return token;
  }

  async regiser(userInfo: UserDTO) {

    //Check by email
    const userByEmail = await this.userRepository.findUserByEmail(userInfo.email);
    if (userByEmail) {
      throw new BadRequestException("Email already exists");
    }

    //Check by username
    const userByUsername = await this.userRepository.findUserByUsername(userInfo.username);
    if (userByUsername) {
      throw new BadRequestException("Username already exists");
    }

    userInfo.password = await this.bcryptService.hashPassword(userInfo.password);
    const user: User = plainToInstance(User, userInfo);
    const userCreated = await this.userRepository.createUser(user);
    if (!userCreated) {
      throw new Error("Error creating user");
    }
    userCreated.password = ""; // Remove password from the response
    return userCreated;
  }

  async logout(userId: number): Promise<void> {
    // Simulate logout logic
    console.log(`User with ID ${userId} logged out`);
  }
}
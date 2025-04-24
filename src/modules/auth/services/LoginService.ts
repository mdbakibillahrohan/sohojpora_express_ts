
import { inject, injectable } from "tsyringe";
import { UserRepositories } from "../../user/repositories/UserRepositories";

@injectable()
export class LoginService {
  constructor(@inject("UserRepositories") private userRepository: UserRepositories) { }
  async login(email: string, password: string): Promise<any> {
    // Simulate login logic
    if (email === "" && password === "") {
      throw new Error("Invalid credentials");
    }
    const user = this.userRepository.findUserById(1); // Simulate finding a user
    return user;
  }
  async logout(userId: number): Promise<void> {
    // Simulate logout logic
    console.log(`User with ID ${userId} logged out`);
  }
}
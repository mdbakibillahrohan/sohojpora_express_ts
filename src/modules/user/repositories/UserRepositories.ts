import { injectable } from "tsyringe";
@injectable()
export class UserRepositories{
    async createUser(user: any) {
        // Simulate user creation logic
        console.log("User created:", user);
        return user;
    }
    async findUserById(id: number) {
        // Simulate finding a user by ID
        const user = { id, name: "John Doe", email: " "};
        return user;
    }
}
import { UserRepositories } from '../../user/repositories/user.repository';
import { injectable } from 'tsyringe';
import { User } from '../../../entities/user.entity';


@injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepositories,){}


        async getAllUsers(
                offset: number, 
                limit: number, 
                searchText: string | null = null, 
                userTypeId: number | null = null, 
                genderId: number | null = null
                ): Promise<{ users: User[]; count: number }> 
                {
                return this.userRepository.getAllUsers(offset,limit,searchText,userTypeId,genderId);                                   
                }


        async createUser(user: User) {
            return this.userRepository.createUser(user);
        }  

        async updateUser(id:number, user: Partial<User>): Promise<number | undefined>{
            return this.userRepository.updateUser(id, user);
        }

        async deleteUser(id: number): Promise<boolean> {
            return this.userRepository.deleteUser(id);
        }

        async getUserById(id: number): Promise<User | null> {
            return this.userRepository.findUserById(id);
        }

        async getUserByEmail(email: string): Promise<User | null> {

            return this.userRepository.findUserByEmail(email);
        }

        async getUsername(username: string): Promise<User | null> {
            return this.userRepository.findUserByUsername(username);
        }
}


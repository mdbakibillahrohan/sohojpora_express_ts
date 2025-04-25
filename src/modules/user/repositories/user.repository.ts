import { injectable } from "tsyringe";
import { User } from "../../../entities/user.entity";
import { Like, Repository } from "typeorm";
import { AppDataSource } from "../../../infrastructure/data-source";
import { ActiveStatus } from "../../../entities/active-status.enum";

@injectable()
export class UserRepositories {
    private userRepository: Repository<User>;
    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    async createUser(user: User) {
        const createdUser = await this.userRepository.save(user);
        return createdUser;
    }

    async getAllUsers(offset: number, limit: number, searchText: string | null = null, userTypeId: number | null = null, genderId: number | null = null): Promise<{ users: User[]; count: number }> {

        const query = this.userRepository.extend({
            where: {
                ...(searchText && {
                    name: Like(`%${searchText}%`),
                    email: Like(`%${searchText}%`),
                    phone: Like(`%${searchText}%`),
                }),
                ...(userTypeId && { user_type_id: userTypeId }),
                ...(genderId && { gender_id: genderId }),
                ...{ active_status: !ActiveStatus.DELETED },
            }
        })

        const count = await query.count();
        const users = await query.find({
            skip: offset,
            take: limit,
            order: {
                created_at: "DESC",
            },
        });
        return {
            users,
            count,
        };
    }

    async updateUser(id: number, user: Partial<User>): Promise<number | undefined> {
        const updatedUser = await this.userRepository.update(id, user);

        return updatedUser.affected;
    }

    async deleteUser(id: number): Promise<boolean> {
        const deletedUser = await this.userRepository.update(id, {
            active_status: ActiveStatus.DELETED,
        });
        if (deletedUser === undefined || deletedUser.affected === 0) {
            return false;
        }
        return true;
    }

    async findUserById(id: number): Promise<User | null> {
        const user = await this.userRepository.findOne({
            where: {
                id,
            },
        });
        return user;
    }

    async findUserByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.findOne({
            where: {
                email,
                active_status: ActiveStatus.ACTIVE,
            },
        });
        return user;
    }

    async findUserByUsername(username: string): Promise<User | null> {
        const user = await this.userRepository.findOne({
            where: {
                username,
                active_status: ActiveStatus.ACTIVE,
            },
        });
        return user;
    }
}
import { injectable } from "tsyringe";
import { Not, Repository } from "typeorm";
import { UserType } from "../../../entities/user-type.entity";
import { AppDataSource } from "../../../infrastructure/data-source";
import { ActiveStatus } from "../../../entities/active-status.enum";

@injectable()
export class UserTypeRepository {
    private userTypeRepository: Repository<UserType>;
    constructor() {
        this.userTypeRepository = AppDataSource.getRepository(UserType);
    }

    async createUserType(userType: UserType): Promise<UserType> {
        return this.userTypeRepository.save(userType);
    }

    async findUserTypeById(id: number): Promise<UserType | null> {
        return this.userTypeRepository.findOne({
            where: { id, active_status: Not(ActiveStatus.DELETED) },
        });
    }

    async userTypeList(): Promise<UserType[]> {
        return this.userTypeRepository.find({
            where: { active_status: Not(ActiveStatus.DELETED) },
            order: {
                created_at: "DESC",
            },
        });
    }

    async deleteUserType(id: number, userId: number): Promise<void> {
        await this.userTypeRepository.update(id, {
            active_status: ActiveStatus.DELETED,
            deleted_at: new Date(),
            deleted_by: userId,
        });
    }

    async updateUserType(id: number, userType: UserType): Promise<UserType> {
        const update = await this.userTypeRepository.update(id, userType);
        if (update.affected === 0) {
            throw new Error("Something went wrong updating the user type");
        }
        return userType;
    }
}

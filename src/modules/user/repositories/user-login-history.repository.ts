import { injectable } from "tsyringe";
import { Not, Repository } from "typeorm";
import { UserLoginHistory } from "../../../entities/user-login-history.entity";
import { AppDataSource } from "../../../infrastructure/data-source";
import { ActiveStatus } from "../../../entities/active-status.enum";

@injectable()
export class UserLoginHistoryRepository {

    private userLoginHistoryRepository: Repository<UserLoginHistory>;
    constructor() {
        this.userLoginHistoryRepository = AppDataSource.getRepository(UserLoginHistory);
    }
    async createUserLoginHistory(userLoginHistory: UserLoginHistory) {
        userLoginHistory.created_at = new Date();
        const createdUserLoginHistory = await this.userLoginHistoryRepository.save(userLoginHistory);
        return createdUserLoginHistory;
    }
    async getUserLoginHistoryByUserId(userId: number, offset: number, limit: number): Promise<{ userLoginHistory: UserLoginHistory[]; count: number }> {
        const count = await this.userLoginHistoryRepository.count({
            where: {
                user_id: userId,
            },
        });
        const userLoginHistory = await this.userLoginHistoryRepository.find({
            where: {
                user_id: userId,
                active_status: Not(ActiveStatus.DELETED)
            },
            skip: offset,
            take: limit,
            order: {
                created_at: "DESC",
            },
        });
        return {
            userLoginHistory,
            count,
        };
    }

    async getUserLoginHistoryById(id: number): Promise<UserLoginHistory | null> {
        const userLoginHistory = await this.userLoginHistoryRepository.findOne({
            where: {
                id,
                active_status: Not(ActiveStatus.DELETED),
            },
        });
        return userLoginHistory;
    }

    async deleteUserLoginHistory(id: number, userId: number): Promise<void> {
        await this.userLoginHistoryRepository.update(id, {
            active_status: ActiveStatus.DELETED,
            deleted_at: new Date(),
            deleted_by: userId,
        });
    }

    async getUserLoginHistoryByToken(token: string): Promise<UserLoginHistory | null> {
        const userLoginHistory = await this.userLoginHistoryRepository.findOne({
            where: {
                token,
                active_status: Not(ActiveStatus.DELETED),
            },
        });
        return userLoginHistory;
    }

}
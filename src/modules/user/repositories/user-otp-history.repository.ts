import { Not, Repository } from "typeorm";
import { UserOtpHistory } from "../../../entities/user-otp-history.entity";
import { AppDataSource } from "../../../infrastructure/data-source";
import { ActiveStatus } from "../../../entities/active-status.enum";
import { injectable } from "tsyringe";

@injectable()
export class UserOtpHistoryRepository {
    private userOtpHistoryRepository: Repository<UserOtpHistory>;

    constructor() {
        this.userOtpHistoryRepository = AppDataSource.getRepository(UserOtpHistory);
    }

    async createUserOtp(userOtp: UserOtpHistory): Promise<UserOtpHistory> {
        userOtp.created_at = new Date();
        const createdUserOtp = await this.userOtpHistoryRepository.save(userOtp);
        return createdUserOtp;
    }

    async getUserOtpById(id: number): Promise<UserOtpHistory | null> {
        const userOtp = await this.userOtpHistoryRepository.findOne({
            where: {
                id,
                active_status: Not(ActiveStatus.DELETED),
            },
        });
        return userOtp;
    }

    async getUserOtpByUserId(userId: number): Promise<UserOtpHistory | null> {
        const userOtp = await this.userOtpHistoryRepository.findOne({
            where: {
                user_id: userId,
                active_status: Not(ActiveStatus.DELETED),
            },
        });
        return userOtp;
    }

    async deleteUserOtp(id: number, userId: number): Promise<void> {
        await this.userOtpHistoryRepository.update(id, {
            active_status: ActiveStatus.DELETED,
            deleted_at: new Date(),
            deleted_by: userId,
        });
    }

    async updateUserOtp(id: number, userOtp: UserOtpHistory): Promise<void> {
        await this.userOtpHistoryRepository.update(id, {
            ...userOtp,
            updated_at: new Date(),
        });
    }

}
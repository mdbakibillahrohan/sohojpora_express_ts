import { injectable } from "tsyringe";
import { UserLoginHistoryRepository } from "../../user/repositories/user-login-history.repository";
import { UserLoginHistory } from "../../../entities/user-login-history.entity";

@injectable()
export class UserLoginHistoryService {
    constructor(
        private readonly userLoginHistoryRepository: UserLoginHistoryRepository
    ) {}
    
    async createUserLoginHistory(userLoginHistory: UserLoginHistory): Promise<UserLoginHistory> {
        return this.userLoginHistoryRepository.createUserLoginHistory(userLoginHistory);
    }
    
    async getUserLoginHistoryByUserId(
        userId: number,
        offset: number,
        limit: number
    ): Promise<{ userLoginHistory: UserLoginHistory[]; count: number }> {
        return this.userLoginHistoryRepository.getUserLoginHistoryByUserId(userId, offset, limit);
    }
    
    async getUserLoginHistoryById(id: number): Promise<UserLoginHistory | null> {
        return this.userLoginHistoryRepository.getUserLoginHistoryById(id);
    }
    
    async deleteUserLoginHistory(id: number, userId: number): Promise<void> {
        return this.userLoginHistoryRepository.deleteUserLoginHistory(id, userId);
    }
    
    async getUserLoginHistoryByToken(token: string): Promise<UserLoginHistory | null> {
        return this.userLoginHistoryRepository.getUserLoginHistoryByToken(token);
    }
}

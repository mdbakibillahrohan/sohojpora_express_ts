import { injectable } from 'tsyringe';
import { UserOtpHistoryRepository } from '../../user/repositories/user-otp-history.repository';
import { UserOtpHistory } from '../../../entities/user-otp-history.entity';

@injectable()
export class UserOtpHistoryService {
    constructor(
        private readonly userOtpHistoryRepository: UserOtpHistoryRepository
    ) {}
    
    async createUserOtp(userOtp: UserOtpHistory): Promise<UserOtpHistory> {
        return this.userOtpHistoryRepository.createUserOtp(userOtp);
    }
    
    async getUserOtpById(id: number): Promise<UserOtpHistory | null> {
        return this.userOtpHistoryRepository.getUserOtpById(id);
    }
    
    async getUserOtpByUserId(userId: number): Promise<UserOtpHistory | null> {
        return this.userOtpHistoryRepository.getUserOtpByUserId(userId);
    }
    
    async deleteUserOtp(id: number, userId: number): Promise<void> {
        return this.userOtpHistoryRepository.deleteUserOtp(id, userId);
    }
    
    async updateUserOtp(id: number, userOtp: UserOtpHistory): Promise<void> {
        return this.userOtpHistoryRepository.updateUserOtp(id, userOtp);
    }

}

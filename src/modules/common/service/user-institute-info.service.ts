import { injectable } from "tsyringe";
import { UserInstituteInfoRepository } from "../../user/repositories/user-institute-info.repository";
import { UserInstituteInfo } from "../../../entities/user-institute-info.entity";

@injectable()
export class UserInstituteInfoService {
    constructor(
        private readonly userInstituteInfoRepository: UserInstituteInfoRepository
    ) {}
    
    async createUserInstituteInfo(userInstituteInfo: UserInstituteInfo): Promise<UserInstituteInfo> {
        return this.userInstituteInfoRepository.create(userInstituteInfo);
    }
    
    async updateUserInstituteInfo(userInstituteInfo: UserInstituteInfo): Promise<UserInstituteInfo> {
        return this.userInstituteInfoRepository.update(userInstituteInfo);
    }
    
    async deleteUserInstituteInfo(id: number, userId: number): Promise<void> {
        return this.userInstituteInfoRepository.delete(id, userId);
    }
    
    async getUserInstituteInfoById(id: number): Promise<UserInstituteInfo | null> {
        return this.userInstituteInfoRepository.findById(id);
    }
    
    async getUserInstituteInfosByUserId(userId: number): Promise<UserInstituteInfo[]> {
        return this.userInstituteInfoRepository.findByUserId(userId);
    }
}

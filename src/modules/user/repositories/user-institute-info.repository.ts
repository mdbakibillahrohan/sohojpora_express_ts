import { injectable } from "tsyringe";
import { Not, Repository } from "typeorm";
import { UserInstituteInfo } from "../../../entities/user-institute-info.entity";
import { AppDataSource } from "../../../infrastructure/data-source";
import { ActiveStatus } from "../../../entities/active-status.enum";

@injectable()
export class UserInstituteInfoRepository {
    private userInstituteInfoRepository: Repository<UserInstituteInfo>;
    constructor() {
        this.userInstituteInfoRepository = AppDataSource.getRepository(UserInstituteInfo);
    }

    async create(userInstituteInfo: UserInstituteInfo): Promise<UserInstituteInfo> {
        return await this.userInstituteInfoRepository.save(userInstituteInfo);
    }

    async update(userInstituteInfo: UserInstituteInfo): Promise<UserInstituteInfo> {
        const existingInfo = await this.userInstituteInfoRepository.findOne({
            where: { id: userInstituteInfo.id, active_status: Not(ActiveStatus.DELETED) },
        });
        if (!existingInfo) {
            throw new Error(`UserInstituteInfo with id ${userInstituteInfo.id} not found or is deleted.`);
        }
        existingInfo.institute_id = userInstituteInfo.institute_id;
        existingInfo.user_id = userInstituteInfo.user_id;
        existingInfo.active_status = userInstituteInfo.active_status;
        existingInfo.updated_at = new Date();
        existingInfo.updated_by = userInstituteInfo.updated_by;
        existingInfo.created_by = userInstituteInfo.created_by;
        existingInfo.institute_type_id = userInstituteInfo.institute_type_id;
        existingInfo.start_date = userInstituteInfo.start_date;
        existingInfo.end_date = userInstituteInfo.end_date;
        existingInfo.active_status = userInstituteInfo.active_status;
        return await this.userInstituteInfoRepository.save(existingInfo);
    }

    async delete(id: number, userId: number): Promise<void> {
        await this.userInstituteInfoRepository.update(id, { active_status: ActiveStatus.DELETED, deleted_at: new Date(), updated_by: userId });
    }

    async findById(id: number): Promise<UserInstituteInfo | null> {
        return await this.userInstituteInfoRepository.findOne({
            where: { id, active_status: Not(ActiveStatus.DELETED) },
        });
    }

    async findByUserId(userId: number): Promise<UserInstituteInfo[]> {
        return await this.userInstituteInfoRepository.find({
            where: { user_id: userId, active_status: Not(ActiveStatus.DELETED) },
        });
    }
}
import { Repository } from "typeorm";
import { UserDevice } from "../../../entities/user-device.entity";
import { AppDataSource } from "../../../infrastructure/data-source";
import { injectable } from "tsyringe";

@injectable()
export class UserDeviceRepository {
    private get userDeviceRepository(): Repository<UserDevice>{
        if (!AppDataSource.isInitialized) {
            throw new Error("Database connection is not initialized");
        }
        return AppDataSource.getRepository(UserDevice);
    }

    // constructor() {
    //     this.userDeviceRepository = AppDataSource.getRepository(UserDevice);
    // }

    async createUserDevice(userDevice: UserDevice, created_by: number): Promise<UserDevice> {
        userDevice.created_at = new Date();
        userDevice.created_by = created_by; 

        const createdUserDevice = await this.userDeviceRepository.save(userDevice);
        return createdUserDevice;
    }
    async getUserDeviceById(id: number): Promise<UserDevice | null> {
        const userDevice = await this.userDeviceRepository.findOne({
            where: {
                id,
            },
        });
        return userDevice;
    }
    async getUserDeviceByUserId(userId: number): Promise<UserDevice | null> {
        const userDevice = await this.userDeviceRepository.findOne({
            where: {
                user_id: userId,
            },
        });
        return userDevice;
    }
}
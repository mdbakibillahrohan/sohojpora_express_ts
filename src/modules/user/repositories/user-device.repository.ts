import { Repository } from "typeorm";
import { UserDevice } from "../../../entities/user-device.entity";
import { AppDataSource } from "../../../infrastructure/data-source";
import { injectable } from "tsyringe";

@injectable()
export class UserDeviceRepository {
    private userDeviceRepository: Repository<UserDevice>;

    constructor() {
        this.userDeviceRepository = AppDataSource.getRepository(UserDevice);
    }

    async createUserDevice(userDevice: UserDevice): Promise<UserDevice> {
        userDevice.created_at = new Date();
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
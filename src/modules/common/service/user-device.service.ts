import { UserDeviceRepository } from '../../user/repositories/user-device.repository';
import { injectable } from 'tsyringe';
import {UserDevice} from '../../../entities/user-device.entity';


@injectable()
export class UserDeviceService{
    constructor(
        private readonly userDiveceRepository: UserDeviceRepository,){}


        async createUserDevice(userDevice: UserDevice, created_by: number) {
            return this.userDiveceRepository.createUserDevice(userDevice,created_by);
        }  

        async getUserDeviceById(id:number): Promise<UserDevice | null>{
            return this.userDiveceRepository.getUserDeviceById(id);
        }

        async getUserDeviceByUserId(userId: number): Promise<UserDevice | null> {
            return  this.userDiveceRepository.getUserDeviceByUserId(userId);
        }

    }

    
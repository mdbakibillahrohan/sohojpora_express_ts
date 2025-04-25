import { injectable } from "tsyringe";
import { UserTypeDto } from "../../dtos/user-type.dto";
import { UserTypeRepository } from "../../repositories/user-type.repository";
import { UserType } from "../../../../entities/user-type.entity";

@injectable()
export class UserTypeService {

    constructor(private readonly userTypeRepository: UserTypeRepository) {

    }

    async createUserType(data: UserTypeDto, userId: number): Promise<UserTypeDto> {

        const userType = new UserType();
        userType.type_name = data.typeName;
        userType.description = data.description;
        userType.created_by = userId;

        const createdUserType = await this.userTypeRepository.createUserType(userType);

        return {
            id: createdUserType.id,
            typeName: createdUserType.type_name,
            description: createdUserType.description,
        };
    }

    async getUserType(id: string): Promise<any> {
        // Logic to get a user type by ID
        return { id };
    }

    async updateUserType(id: string, data: any): Promise<any> {
        // Logic to update a user type
        return { id, ...data };
    }

    async deleteUserType(id: string): Promise<void> {
        // Logic to delete a user type
    }
}
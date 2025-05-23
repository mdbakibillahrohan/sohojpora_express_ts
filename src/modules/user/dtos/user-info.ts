import { injectable } from "tsyringe";

@injectable()
export class UserInfoDTO {
    id!: number;
    user_type_id!: number;
    gender_id!: number;
    first_name!: string;
    last_name!: string;
    phone_number!: string;
    email!: string;
    username!: string;
    date_of_birth!: Date;
    password?: string; // made optional

}

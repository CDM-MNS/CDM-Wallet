import {InjectRepository} from "@nestjs/typeorm";
import {UserWalletEntity} from "../Objects/Entities/userWallet.entity";
import {UserWalletDto} from "../Objects/DTOs/userWallet.dto";
import {Repository} from "typeorm";
import {Injectable} from "@nestjs/common";

@Injectable()
export class UserWalletService {

    constructor(
        @InjectRepository(UserWalletEntity)
        private userWalletRepository: Repository<UserWalletEntity>
    ) {}

    async getAll() : Promise<UserWalletDto[]> {
        return await this.userWalletRepository.find();
    }
}
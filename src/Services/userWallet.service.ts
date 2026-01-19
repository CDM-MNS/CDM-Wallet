import {InjectRepository} from "@nestjs/typeorm";
import {UserWalletEntity} from "../Objects/Entities/userWallet.entity";
import {UserWalletDto} from "../Objects/DTOs/userWallet.dto";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {Injectable, NotFoundException} from "@nestjs/common";

@Injectable()
export class UserWalletService {

    constructor(
        @InjectRepository(UserWalletEntity)
        private userWalletRepository: Repository<UserWalletEntity>
    ) {}

    async getAll() : Promise<UserWalletDto[]> {
        return await this.userWalletRepository.find();
    }

    async getById(id: number) : Promise<UserWalletDto> {
        const fetchedWallet = await this.userWalletRepository.findOne({
            where : { id : id }
        })

        if(fetchedWallet === null){
            throw new NotFoundException("Wallet does not exist");
        }
        return fetchedWallet
    }

    async create(userWalletDto: UserWalletDto) : Promise<UserWalletDto> {
        return await this.userWalletRepository.save(userWalletDto);
    }

    async update(id: number, userWalletDto: UserWalletDto) : Promise<UpdateResult> {
        return await this.userWalletRepository.update(id, userWalletDto)
    }

    async delete(id: number) : Promise<DeleteResult> {
        return await this.userWalletRepository.delete(id);
    }
}
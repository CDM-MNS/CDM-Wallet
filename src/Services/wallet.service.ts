import {InjectRepository} from "@nestjs/typeorm";
import {WalletEntity} from "../Objects/Entities/wallet.entity";
import {WalletDto} from "../Objects/DTOs/wallet.dto";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {Injectable, NotFoundException} from "@nestjs/common";

@Injectable()
export class WalletService {

    constructor(
        @InjectRepository(WalletEntity)
        private userWalletRepository: Repository<WalletEntity>
    ) {}

    async getAll() : Promise<WalletDto[]> {
        return await this.userWalletRepository.find();
    }

    async getById(id: number) : Promise<WalletDto> {
        const fetchedWallet = await this.userWalletRepository.findOne({
            where : { id : id }
        })

        if(fetchedWallet === null){
            throw new NotFoundException("Wallet does not exist");
        }
        return fetchedWallet
    }

    async create(userWalletDto: WalletDto) : Promise<WalletDto> {
        return await this.userWalletRepository.save(userWalletDto);
    }

    async update(id: number, userWalletDto: WalletDto) : Promise<UpdateResult> {
        return await this.userWalletRepository.update(id, userWalletDto)
    }

    async delete(id: number) : Promise<DeleteResult> {
        return await this.userWalletRepository.delete(id);
    }
}
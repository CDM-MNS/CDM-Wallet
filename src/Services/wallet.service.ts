import {InjectRepository} from "@nestjs/typeorm";
import {WalletEntity} from "../Objects/Entities/wallet.entity";
import {WalletDto} from "../Objects/DTOs/wallet.dto";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {Injectable, NotFoundException} from "@nestjs/common";
import {UserDto} from "@cdm/models";

@Injectable()
export class WalletService {

    constructor(
        @InjectRepository(WalletEntity)
        private walletRepository: Repository<WalletEntity>
    ) {}

    async getAll() : Promise<WalletDto[]> {
        return await this.walletRepository.find();
    }

    async getById(id: number) : Promise<WalletDto> {
        const fetchedWallet = await this.walletRepository.findOne({
            where : { id : id }
        })

        if(fetchedWallet === null){
            throw new NotFoundException("Wallet does not exist");
        }
        return fetchedWallet
    }

    async create(userWalletDto: WalletDto) : Promise<WalletDto> {
        return await this.walletRepository.save(userWalletDto);
    }

    async update(id: number, userWalletDto: WalletDto) : Promise<UpdateResult> {
        return await this.walletRepository.update(id, userWalletDto)
    }

    async delete(id: number) : Promise<DeleteResult> {
        return await this.walletRepository.delete(id);
    }

    async createNewWalletForUser(userDto: UserDto) : Promise<WalletDto> {
        if(userDto.id === undefined)
            throw new NotFoundException("User with id is missing");

        const wallet = new WalletDto(0, userDto.id, 0, 50)
        return await this.walletRepository.save(wallet);
    }
}
import {InjectRepository} from "@nestjs/typeorm";
import {WalletEntity} from "../Objects/Entities/wallet.entity";
import {WalletDto} from "../Objects/DTOs/wallet.dto";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {ConflictException, Inject, Injectable, NotFoundException} from "@nestjs/common";
import {firstValueFrom} from "rxjs";
import {ClientProxy} from "@nestjs/microservices";
import {WalletEventType} from "cdm-models";

@Injectable()
export class WalletService {

    constructor(
        @InjectRepository(WalletEntity)
        private walletRepository: Repository<WalletEntity>,
        @Inject('WALLET_SERVICE') private readonly walletClient : ClientProxy
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

    async getByOwnerId(ownerId: number) : Promise<WalletDto> {
        const fetchedWallet = await this.walletRepository.findOne({
            where : { ownerId : ownerId }
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

    async createNewWalletForUser(userId: number) : Promise<WalletDto> {
        if(userId === undefined)
            throw new NotFoundException("User with id is missing");

        const wallet = new WalletDto(userId, 0, 50)
        return await this.walletRepository.save(wallet);
    }

    async deleteWalletByUserId(userId: number) : Promise<DeleteResult> {
        const userWallet = await this.getByOwnerId(userId);
        if(!userWallet === undefined)
            throw new NotFoundException("wallet is missing");

        return await this.walletRepository.delete(userWallet.id);
    }

    async addMoneyToWallet(walletId:number, moneyToAdd:number) : Promise<UpdateResult> {
        const isOperationASuccess = await firstValueFrom(
            this.walletClient.send({cmd: WalletEventType.ADD_MONEY}, {id: walletId, amountToAdd: moneyToAdd}
            )
        );

        if(isOperationASuccess)
        {
            let walletDto : WalletDto = await this.getByOwnerId(walletId);
            if(walletDto !== undefined){
                walletDto.coinsBalance += moneyToAdd;
            } else
            {
                throw new NotFoundException("wallet does not exist");
            }

            return this.update(walletId, walletDto);
        } else
        {
            throw new ConflictException("Payment was not authorized");
        }
    }
}
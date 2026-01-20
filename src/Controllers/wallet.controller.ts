import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {WalletService} from "../Services/wallet.service";
import {WalletDto} from "../Objects/DTOs/wallet.dto";
import {DeleteResult, UpdateResult} from "typeorm";
import {EventPattern, Payload} from "@nestjs/microservices";
import {UserDto} from "@cdm/models";
import {RpcValidationPipe} from "../Utils/rpc-validation";

@Controller('wallet')
export class WalletController {

    constructor(private readonly walletService: WalletService) {
    }

    @Get()
    async getAll() : Promise<WalletDto[]> {
        return await this.walletService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: number) : Promise<WalletDto> {
        return await this.walletService.getById(id);
    }

    @EventPattern('wallet.getByOwnerId')
    @Get('/owner/:ownerId')
    async getByOwnerId(@Param('ownerId') ownerId: number) : Promise<WalletDto> {
        return await this.walletService.getByOwnerId(ownerId)
    }

    @Post()
    async create(@Body() userWalletDto: WalletDto) : Promise<WalletDto> {
        return await this.walletService.create(userWalletDto);
    }

    @EventPattern('wallet.update')
    @Put(":id")
    async update(@Param('id') id:number, @Body() userWalletDto: WalletDto) : Promise<UpdateResult> {
        return await this.walletService.update(id, userWalletDto);
    }

    @EventPattern('wallet.delete')
    @Delete(":id")
    async delete(@Param('id') id:number) : Promise<DeleteResult> {
        return await this.walletService.delete(id)
    }

    @EventPattern('wallet.create')
    async handleEventUserCreated(@Payload(new RpcValidationPipe()) userId: number) {
        await this.walletService.createNewWalletForUser(userId);
    }


}

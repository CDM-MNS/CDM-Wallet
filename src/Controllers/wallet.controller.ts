import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {WalletService} from "../Services/wallet.service";
import {WalletDto} from "../Objects/DTOs/wallet.dto";
import {DeleteResult, UpdateResult} from "typeorm";

@Controller('wallet')
export class WalletController {

    constructor(private readonly userWalletService: WalletService) {
    }

    @Get()
    async getAll() : Promise<WalletDto[]> {
        return await this.userWalletService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: number) : Promise<WalletDto> {
        return await this.userWalletService.getById(id);
    }

    @Post()
    async create(@Body() userWalletDto: WalletDto) : Promise<WalletDto> {
        return await this.userWalletService.create(userWalletDto);
    }

    @Put(":id")
    async update(@Param('id') id:number, @Body() userWalletDto: WalletDto) : Promise<UpdateResult> {
        return await this.userWalletService.update(id, userWalletDto);
    }

    @Delete(":id")
    async delete(@Param('id') id:number) : Promise<DeleteResult> {
        return await this.userWalletService.delete(id)
    }


}

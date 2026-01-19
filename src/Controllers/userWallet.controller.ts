import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {UserWalletService} from "../Services/userWallet.service";
import {UserWalletDto} from "../Objects/DTOs/userWallet.dto";
import {DeleteResult, UpdateResult} from "typeorm";

@Controller('userWallet')
export class UserWalletController {

    constructor(private readonly userWalletService: UserWalletService) {
    }

    @Get()
    async getAll() : Promise<UserWalletDto[]> {
        return await this.userWalletService.getAll();
    }

    @Get(':id')
    async getById(@Param('id') id: number) : Promise<UserWalletDto> {
        return await this.userWalletService.getById(id);
    }

    @Post()
    async create(@Body() userWalletDto: UserWalletDto) : Promise<UserWalletDto> {
        return await this.userWalletService.create(userWalletDto);
    }

    @Put(":id")
    async update(@Param('id') id:number, @Body() userWalletDto: UserWalletDto) : Promise<UpdateResult> {
        return await this.userWalletService.update(id, userWalletDto);
    }

    @Delete(":id")
    async delete(@Param('id') id:number) : Promise<DeleteResult> {
        return await this.userWalletService.delete(id)
    }


}

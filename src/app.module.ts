import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {UserWalletEntity} from "./Objects/Entities/userWallet.entity";
import {UserWalletController} from "./Controllers/userWallet.controller";
import {UserWalletService} from "./Services/userWallet.service";



@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
      }
    ),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [UserWalletEntity],
      synchronize: Boolean(process.env.POSTGRES_SYNCHRONISE)
    }),
    TypeOrmModule.forFeature([UserWalletEntity])
  ],  controllers: [UserWalletController],
  providers: [UserWalletService],
})
export class AppModule {}

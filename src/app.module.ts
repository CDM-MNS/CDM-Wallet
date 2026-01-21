import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import {WalletEntity} from "./Objects/Entities/wallet.entity";
import {WalletController} from "./Controllers/wallet.controller";
import {WalletService} from "./Services/wallet.service";
import {ClientsModule, Transport} from "@nestjs/microservices";



@Module({
  imports: [
    ConfigModule.forRoot(
      {
        isGlobal: true,
      }
    ),
    ClientsModule.register([
      {
        name: 'WALLET_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.USER_SERVICE_HOST || '',
          port: parseInt(process.env.USER_SERVICE_TCP_PORT || ''),
        },
      }
    ]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [WalletEntity],
      synchronize: Boolean(process.env.POSTGRES_SYNCHRONISE)
    }),
    TypeOrmModule.forFeature([WalletEntity])
  ],  controllers: [WalletController],
  providers: [WalletService],
})
export class AppModule {}

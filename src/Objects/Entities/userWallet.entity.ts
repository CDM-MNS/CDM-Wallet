import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserWalletEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    ownerId: number;
    @Column()
    coinsBalance: number;
    @Column()
    freeCoinsBalance: number;
}
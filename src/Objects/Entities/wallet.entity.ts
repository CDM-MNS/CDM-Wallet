import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class WalletEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    ownerId: number;
    @Column()
    coinsBalance: number;
    @Column()
    freeCoinsBalance: number;
}
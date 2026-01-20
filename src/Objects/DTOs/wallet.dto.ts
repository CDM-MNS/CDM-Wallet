
export class WalletDto {
    ownerId: number;
    coinsBalance: number;
    freeCoinsBalance: number;

    constructor(ownerId: number, coinsBalance: number, freeCoinsBalance: number)
    {
        this.ownerId = ownerId;
        this.coinsBalance = coinsBalance;
        this.freeCoinsBalance = freeCoinsBalance;
    }
}

export class UserWalletDto {
    id: number;
    ownerId: number;
    coinsBalance: number;
    freeCoinsBalance: number;

    constructor(id: number, ownerId: number, coinsBalance: number, freeCoinsBalance: number)
    {
        this.id = id;
        this.ownerId = ownerId;
        this.coinsBalance = coinsBalance;
        this.freeCoinsBalance = freeCoinsBalance;
    }
}
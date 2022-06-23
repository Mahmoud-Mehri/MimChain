
export class Account {
    address: string;
    balance: number;
    nonce: number;

    constructor(address: string) {
        this.address = address;
        this.balance = 0;
        this.nonce = 0;
    }
}
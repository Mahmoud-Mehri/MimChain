
export class Transaction {
    sign: string;
    to: string;
    value: number;
    gemFee: number;
    nonce: number;
    hash: string;
    timestamp: Date;
    blockNumber: number;

    constructor(sign: string, to: string, value: number, gemFee: number, nonce: number) {
        this.sign = sign;
        this.to = to;
        this.value = value;
        this.gemFee = gemFee;
        this.nonce = nonce;
        this.hash = "";
        this.timestamp = new Date();
        this.blockNumber = 0;
    }

    get key() {
        return this.sign + this.to + this.value + this.nonce + this.timestamp.toISOString;
    }

    setHash(hash: string) {
        this.hash = hash;
        return true;
    }
}
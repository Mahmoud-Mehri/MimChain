import * as types from '../utils/types';

export class Transaction {
    blockNumber: number;
    from: string;
    to: string;
    value: number;
    gemFee: number;
    nonce: number;
    hash: string;
    timestamp: Date;

    constructor(from: string, to: string, value: number, gasFee: number) {
        this.from = from;
        this.to = to;
        this.value = value;
        this.gemFee = gasFee;
        this.nonce = 0;
        this.hash = "";
        this.timestamp = new Date();
        this.blockNumber = -1;
    }

    get key() {
        return this.from + this.to + this.value + this.nonce + this.timestamp.toISOString;
    }

    setHash(hash: string) {
        this.hash = hash;
        return true;
    }

}
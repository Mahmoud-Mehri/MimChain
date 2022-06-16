import { Transaction } from "./transaction";
import config from "../config.json";

export class Block {
    index: number;
    previousHash: string;
    transactions: Array<Transaction>;
    nonce: number;
    hash: string;

    constructor(prevBlock: Block | null) {
        if (prevBlock) {
            this.index = prevBlock.index + 1;
            this.previousHash = prevBlock.hash;
        } else {
            this.index = 0;
            this.previousHash = config.defaultGenesisHash;
        }

        this.nonce = 0;
        this.hash = "";
        this.transactions = [];
    }

    get key() {
        return JSON.stringify(this.transactions) + this.index + this.previousHash + this.nonce;
    }

    addTransaction(transaction: Transaction) {
        this.transactions.push(transaction);
    }
}
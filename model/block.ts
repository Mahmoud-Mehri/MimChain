import { Transaction } from "./transaction";
import config from "../config.json";

class BlockHeader {
    number: number;
    difficulty: number;
    nonce: number;
    hash: string;
    previousBlockHash: string;
    minerAddress: string;

    constructor(_number: number, _difficulty: number, _prevoiusHash: string) {
        this.number = _number;
        this.difficulty = _difficulty;
        this.previousBlockHash = _prevoiusHash;
        this.minerAddress = "";

        this.nonce = 0;
        this.hash = "";
    }
}

export class Block {
    header: BlockHeader;
    transactions: Array<Transaction>;

    constructor(_blockNumber: number, _difficulty: number, _prevHash: string) {
        this.header = new BlockHeader(_blockNumber, _difficulty, _prevHash);

        this.transactions = [];
    }

    get key() {
        return JSON.stringify(this.transactions) + this.header.number + this.header.previousBlockHash + this.header.nonce;
    }

    addTransaction(transaction: [Transaction]) {
        this.transactions.push(...transaction);
    }

    setMinerAddress(address: string) {
        this.header.minerAddress = address;
    }
}
import { Transaction } from "./transaction";
import config from "../config.json";

class BlockHeader {
    number: number;
    previousBlockHash: string;
    nonce: number;
    hash: string;

    constructor(header: BlockHeader | null) {
        if (header) {
            this.number = header.number + 1;
            this.previousBlockHash = header.hash;
        } else {
            this.number = 0;
            this.previousBlockHash = config.defaultGenesisHash;
        }

        this.nonce = 0;
        this.hash = "";
    }
}

export class Block {
    header: BlockHeader;
    transactions: Array<Transaction>;

    constructor(prevBlock: Block | null, blockNumber = 1) {
        if (prevBlock) {
            this.header = new BlockHeader(prevBlock.header);
        } else {
            this.header = new BlockHeader(null);
            this.header.number = blockNumber;
            this.header.previousBlockHash = config.defaultGenesisHash;
        }

        this.transactions = [];
    }

    get key() {
        return JSON.stringify(this.transactions) + this.header.number + this.header.previousBlockHash + this.header.nonce;
    }

    addTransaction(transaction: Transaction) {
        this.transactions.push(transaction);
    }
}
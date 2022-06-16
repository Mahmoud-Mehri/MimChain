import { Block } from '../model/block';
import { Transaction } from '../model/transaction';
import { HashGenerator } from '../utils/hashgenerator';

export class BlockChain {

    blocks: Array<Block>;
    hashGenerator: HashGenerator;

    constructor(genesisBlock: Block | null) {
        this.hashGenerator = HashGenerator.getInstance();
        if (genesisBlock) {
            this.blocks = [genesisBlock];
        } else {
            this.blocks = [];
        }
    }

    get genesisBlock() {
        return this.blocks[0];
    }

    get lastBlock() {
        return this.blocks[this.blocks.length - 1];
    }

    async addBlock(block: Block) {
        this.hashGenerator.newBlockHash(block)
            .then(hash => {
                block.hash = hash;
                this.blocks.push(block);
                return true;
            });
    }
}

module.exports = BlockChain;
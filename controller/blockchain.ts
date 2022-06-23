import { Block } from '../model/block';
import { Transaction } from '../model/transaction';
import { HashGenerator } from '../utils/hashgenerator';
import { ReverseLinkedList } from '../utils/linked-block-list';

export class BlockChain {

    private _genesisBlockHash: string;
    private _currentBlockHash: string;
    blocks: Map<string, Block>;
    hashGenerator: HashGenerator;

    constructor(genesisBlock: Block) {
        // super();

        this.blocks = new Map<string, Block>;
        this.hashGenerator = HashGenerator.getInstance();

        this._genesisBlockHash = genesisBlock.header.hash;
        this.blocks[this._genesisBlockHash] = genesisBlock;
        this._currentBlockHash = this._genesisBlockHash;
    }

    get genesisBlock() {
        return this.blocks[this._genesisBlockHash];
    }

    get currentBlock() {
        return this.blocks[this._currentBlockHash];
    }

    addBlock(block: Block) {
        if (!this.blocks.has(block.header.hash)) {
            this.blocks[block.header.hash] = block;
        }
    }
}

module.exports = BlockChain;
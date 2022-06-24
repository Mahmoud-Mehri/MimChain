import { Block } from '../model/block';
import { Transaction } from '../model/transaction';
import { HashGenerator } from '../utils/hashgenerator';

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

    clone(blockChain: BlockChain) {
        this._genesisBlockHash = blockChain.genesisBlock.header.hash;
        this._currentBlockHash = blockChain.currentBlock.header.hash;


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
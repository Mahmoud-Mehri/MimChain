import { Transaction } from '../model/transaction';
import { HashGenerator } from '../utils/hashgenerator';
import * as types from '../utils/types';
import { NodeInfo } from '../model/nodeinfo';
import { BlockChain } from './blockchain';
import { Block } from '../model/block';

export class Network {
    networkTime: number; // The Time it takes to make a new Block, in Miliseconds
    difficulty: number;
    baseGemFee: number;
    transactionPool: Array<Transaction>; // Pending Transactions
    transactions: Array<Transaction>; // Transactions which are confirmed and added to the Blockchain
    blockChain: BlockChain;
    hashGenerator: HashGenerator;

    constructor() {
        this.networkTime = 1000; // 1 second
        this.difficulty = 1;
        this.baseGemFee = 0.001;
        this.transactionPool = [];
        this.transactions = [];
        const genBlock = new Block(null);
        this.blockChain = new BlockChain(genBlock);
        this.hashGenerator = HashGenerator.getInstance();
        this.hashGenerator.setDifficulty(this.difficulty);
    }

    clone(network: Network) {
        this.networkTime = network.networkTime;
        this.difficulty = network.difficulty;
        this.baseGemFee = network.baseGemFee;
        this.transactionPool = Array.from(network.transactionPool);
        this.transactions = Array.from(network.transactionPool);
        this.blockChain.clone(network.blockChain);
    }

    setNetworkDifficulty(diff: number) {
        this.difficulty = diff;
        this.hashGenerator.setDifficulty(diff);
        return true;
    }

    calculateGemFeePerTransaction() {
        const fee = (this.difficulty * 0.001);
        return this.baseGemFee + fee;
    }

}
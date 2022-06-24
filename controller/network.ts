import { Transaction } from '../model/transaction';
import { TransactionInfo } from '../model/transactioninfo';
import { HashGenerator } from '../utils/hashgenerator';
import * as types from '../utils/types';
import { NodeInfo } from '../model/nodeinfo';
import { BlockChain } from './blockchain';
import { Block } from '../model/block';
import { Account } from '../model/account';

export class Network {
    networkTime: number; // The Time it takes to make a new Block, in Miliseconds
    difficulty: number;
    baseGemFee: number;
    accounts: Map<string, Map<string, Account>>;
    transactionPool: Array<Transaction>; // Pending Transactions
    transactions: Array<Transaction>; // Transactions which are confirmed and added to the Blockchain
    blockChain: BlockChain;
    hashGenerator: HashGenerator;

    constructor() {
        this.networkTime = 1000; // 1 second
        this.difficulty = 1;
        this.baseGemFee = 0.001;
        this.accounts = new Map<string, Map<string, Account>>;
        this.transactionPool = [];
        this.transactions = [];
        const genBlock = new Block(1, this.difficulty, '');
        this.blockChain = new BlockChain(genBlock);
        this.hashGenerator = HashGenerator.getInstance();
        this.hashGenerator.setDifficulty(this.difficulty);
    }

    get gemFeePerTransaction() {
        const fee = (this.difficulty * 0.001);
        return this.baseGemFee + fee;
    }

    clone(network: Network) {
        this.networkTime = network.networkTime;
        this.difficulty = network.difficulty;
        this.baseGemFee = network.baseGemFee;
        ///
        this.transactionPool = Array.from(network.transactionPool);
        this.transactions = Array.from(network.transactionPool);
        this.blockChain.clone(network.blockChain);
    }

    setNetworkDifficulty(diff: number) {
        this.difficulty = diff;
        this.hashGenerator.setDifficulty(diff);
        return true;
    }

    getAccount(privateKey: string, accountAddr: string) {
        if (this.accounts.has(privateKey))
            if (this.accounts[privateKey].has(accountAddr))
                return this.accounts[privateKey][accountAddr];

        return null;
    }

    addNewTransaction(transInfo: TransactionInfo, sign: string) {
        const account = this.getAccount(transInfo.privateKey, transInfo.from);

        const newTran = new Transaction(sign, transInfo.to, transInfo.value, this.gemFeePerTransaction, account.nonce + 1);
        this.transactionPool.push(newTran);

        return true;
    }

    confirmTransaction() {

    }

}
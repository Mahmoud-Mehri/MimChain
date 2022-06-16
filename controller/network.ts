import { Node } from './node'
import { Transaction } from '../model/transaction';
import { HashGenerator } from '../utils/hashgenerator';
import * as types from '../utils/types';
import { NodeInfo } from '../model/nodeinfo';

export class Network {
    nodes: Map<string, NodeInfo>;
    difficulty: number;
    baseGemFee: number;
    transactionPool: Array<Transaction>; // Pending Transactions
    transactions: Array<Transaction>; // Transactions which are confirmed and added to the Blockchain
    hashGenerator: HashGenerator;

    constructor() {
        this.nodes = new Map([]);
        this.difficulty = 1;
        this.baseGemFee = 0.001;
        this.transactionPool = [];
        this.transactions = [];
        this.hashGenerator = HashGenerator.getInstance();
        this.hashGenerator.setDifficulty(this.difficulty);
    }

    registerNode(node: NodeInfo) {
        const nodeHash = this.hashGenerator.newSha256(node.host + node.port);
        if (this.nodes.has(nodeHash)) {
            return false;
        } else {
            node.hash = nodeHash;
            this.nodes.set(nodeHash, node);
            return true;
        }
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

    transferValue(from: string, to: string, value: number) {
        const trans = new Transaction(from, to, value, this.calculateGemFeePerTransaction());

    }

    async checkTransactionStatus(hash: string) {
        this.nodes.forEach((node, index, array) => {

        })
    }

    getTransactionStatus(transHash: string) {
        const tranStatus = types.TransactionStatus.tsConfirmed;
        return tranStatus;
    }

    getTransactionList(dateFrom: Date | null, status: types.TransactionStatus | null) {
        if (!dateFrom || !status) {
            return this.transactions.filter((trans: Transaction) => {
                let accept;
                if (!dateFrom) {
                    accept = (trans.timestamp >= dateFrom!);
                }
                if (!status) {
                    accept = (trans.status == status!);
                }

                return accept;
            })
        }
        return this.transactions;
    }

    broadcastNewTransaction() {

    }

    checkTransactionConfirmation() {

    }

}
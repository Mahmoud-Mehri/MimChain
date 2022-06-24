import * as types from '../utils/types';
import { Network } from './network';
import { Block } from "../model/block";
import { NodeInfo } from '../model/nodeinfo';
import { HashGenerator } from '../utils/hashgenerator';
import { TransactionInfo } from '../model/transactioninfo';
import { Transaction } from '../model/transaction';

export class Node {

    info: NodeInfo;
    nodes: Map<string, NodeInfo>;
    network: Network;

    constructor(host: string, port: number) {
        this.info = new NodeInfo(host, port);
        this.nodes = new Map<string, NodeInfo>;
        this.network = new Network();
    }

    registerNode(node: NodeInfo) {
        const nodeHash = this.network.hashGenerator.newSha256(node.host + node.port);
        if (this.nodes.has(nodeHash)) {
            return false;
        } else {
            node.hash = nodeHash;
            this.nodes.set(nodeHash, node);
            return true;
        }
    }

    importNodes(nodes: [NodeInfo]) {

    }

    async createTransaction(transInfo: TransactionInfo) {
        return new Promise((resolve, reject) => {
            const accountFrom = this.network.getAccount(transInfo.privateKey, transInfo.from);
            if (!accountFrom)
                reject(types.ResultObject(false, "Sender account address is not valid"));

            const gemFee = this.network.gemFeePerTransaction;
            if (transInfo.gemLimit < gemFee)
                reject(types.ResultObject(false, "Gem Limit amount is less than required Gem Fee"));

            if (accountFrom.balance < (transInfo.value + gemFee))
                reject(types.ResultObject(false, "Sender account has not enough balance"));

            // const accountTo = this.network.getAccount('', transInfo.to);
            // if (!accountTo)
            //     reject(types.ResultObject(false, "Recipient account is not valid"));

            const sign = this.signTransaction();
            this.network.addNewTransaction(transInfo, sign);
        })
    }

    signTransaction() {
        return "";
    }

    async confirmBlock(block: Block, blockHash: string) {
        this.network.hashGenerator.newBlockHash(block)
            .then(hash => {
                if (hash == blockHash) {

                }
            })
    }

    async mineBlock() {
        // const block = new Block(this.network.blockchain.blocks[this.network.blockchain.blocks.size - 1]);

    }

    async transferValue(from: string, to: string, value: number) {
        // const trans = new Transaction(from, to, value, this.calculateGemFeePerTransaction());

    }

    async checkTransactionStatus(hash: string) {
        this.nodes.forEach((node, index, array) => {

        })
    }

    getTransactionStatus(transHash: string) {
        // const tranStatus = types.TransactionStatus.tsConfirmed;
        // return tranStatus;
    }

    // getTransactionList(dateFrom: Date | null, status: types.TransactionStatus | null) {
    //     if (!dateFrom || !status) {
    //         return this.transactions.filter((trans: Transaction) => {
    //             let accept;
    //             if (!dateFrom) {
    //                 accept = (trans.timestamp >= dateFrom!);
    //             }
    //             if (!status) {
    //                 accept = (trans.status == status!);
    //             }

    //             return accept;
    //         })
    //     }
    //     return this.transactions;
    // }

    broadcastNewTransaction() {

    }

    checkTransactionConfirmation() {

    }

}
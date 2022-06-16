import { BlockChain } from "./blockchain";
import { HashGenerator } from "../utils/hashgenerator";
import { Block } from "../model/block";
import { Transaction } from "../model/transaction";
import { NodeInfo } from '../model/nodeinfo';

export class Node {

    info: NodeInfo;
    blockchain: BlockChain;
    transactions: Array<Transaction>;
    otherNodes: Array<Node>;

    constructor(host: string, port: number) {
        this.info = new NodeInfo(host, port);
        this.blockchain = new BlockChain(null);
        this.transactions = [];
        this.otherNodes = [];
    }

    importNodes(nodes: [NodeInfo]) {

    }

    importBlocks(blocks: [Block]) {
        this.blockchain.blocks = blocks;
    }

    importTransactions(transactions: [Transaction]) {

    }

    newTransaction(trans: Transaction) {

    }

    async mineBlock() {
        const block = new Block(this.blockchain.blocks[this.blockchain.blocks.length - 1]);

    }

}
import * as sha from 'js-sha256';
import { Transaction } from '../model/transaction';
import { Block } from '../model/block';

export class HashGenerator {
    private static instance: HashGenerator;
    difficulty: number;
    currentNetworkTime: number;

    private constructor() {
        this.difficulty = 1;
        this.currentNetworkTime = 1;
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new HashGenerator();
        }
        return this.instance;
    }

    setDifficulty(diff: number) {
        this.difficulty = diff;
        return true;
    }

    newPrivateKey() {
        const salt1 = Math.random().toString(36).replace(/[^a-z]+/g, '');
        const salt2 = Math.random().toString(36).replace(/[^a-z]+/g, '');
        const hash = sha.sha256(salt1 + salt2);

        return hash;
    }

    newAccountNumber(privateKey: string, nonce: number = 1) {
        return sha.sha224(privateKey + nonce);
    }

    newTransactionHash(trans: Transaction, privateKey: string) {
        const hash = sha.sha256(trans.key + privateKey);
        return hash;
    }

    newBlockHash(block: Block) {
        return new Promise<string>((resolve, reject) => {
            const sign = '0'.repeat(this.difficulty);
            let hash = sha.sha256(block.key);
            while (!hash.startsWith(sign)) {
                block.nonce++;
                hash = sha.sha256(block.key);
            }
            resolve(hash);
        })
    }

    newSha256(key: string) {
        return sha.sha256(key);
    }

    newSha224(key: string) {
        return sha.sha224(key);
    }

}
import * as sha from 'js-sha256';
import { TransactionInfo } from '../model/transactioninfo';
import { Block } from '../model/block';
import { Account } from '../model/account';

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

    newAccountAddress(privateKey: string, nonce: number = 1) {
        return sha.sha224(privateKey + nonce);
    }

    newTransactionHash(accountInfo: Account) {
        const hash = sha.sha256(accountInfo.address + accountInfo.nonce);
        return hash;
    }

    newBlockHash(block: Block) {
        return new Promise<string>((resolve, reject) => {
            const sign = '0'.repeat(block.header.difficulty);
            let hash = sha.sha256(block.key);
            while (!hash.startsWith(sign)) {
                block.header.nonce++;
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
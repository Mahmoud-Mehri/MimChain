import * as types from '../utils/types';
import { HashGenerator } from '../utils/hashgenerator';
import { Account } from './account';

export class Wallet {
    hashGenerator: HashGenerator;
    privateKey: string;
    accounts: Array<Account>;

    constructor(privateKey: string) {
        this.privateKey = privateKey;
        this.hashGenerator = HashGenerator.getInstance();

        const firstAccountAddress = this.hashGenerator.newAccountAddress(privateKey);
        const firstAccount = new Account(firstAccountAddress);
        this.accounts = [firstAccount];
    }

    getAccount(index: number = 0) {
        if (index >= 0 && index < this.accounts.length) {
            return this.accounts[index];
        }
        return null;
    }

    newAccount() {
        return new Account(this.hashGenerator.newAccountAddress(this.privateKey, this.accounts.length));
    }
}
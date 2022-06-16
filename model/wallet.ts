import * as types from '../utils/types';
import { HashGenerator } from '../utils/hashgenerator';

class Account {
    number: string;
    balance: number;
    nonce: number;

    constructor(number: string) {
        this.number = number;
        this.balance = 0;
        this.nonce = 0;
    }
}

export class Wallet {
    hashGenerator: HashGenerator;
    privateKey: string;
    accounts: Array<Account>;

    constructor(privateKey: string) {
        this.privateKey = privateKey;
        this.hashGenerator = HashGenerator.getInstance();

        const firstAccountNumber = this.hashGenerator.newAccountNumber(privateKey);
        const firstAccount = new Account(firstAccountNumber);
        this.accounts = [firstAccount];
    }

    getAccount(index: number = 0) {
        if (index >= 0 && index < this.accounts.length) {
            return this.accounts[index];
        }
        return null;
    }

    newAccount() {
        return new Account(this.hashGenerator.newAccountNumber(this.privateKey));
    }
}
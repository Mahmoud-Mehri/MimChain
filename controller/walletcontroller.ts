import { Wallet } from "../model/wallet";
import { HashGenerator } from "../utils/hashgenerator";

export class WalletController {
    hashGenerator: HashGenerator;
    wallets: Array<Wallet>;

    constructor() {
        this.hashGenerator = HashGenerator.getInstance();
        this.wallets = [];
    }

    createNewWallet() {
        const privateKey = this.hashGenerator.newPrivateKey();
        const wallet = new Wallet(privateKey);
        this.wallets.push(wallet);

        return wallet;
    }

    getWalletByPrivateKey(privateKey: string) {
        for (let i = 0; i < this.wallets.length; i++) {
            if (this.wallets[i].privateKey == privateKey) {
                return this.wallets[i];
            }
        }
        return null;
    }
}
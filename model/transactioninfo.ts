import * as types from '../utils/types';

export class TransactionInfo {
    privateKey: string;
    from: string;
    to: string;
    value: number;
    gemLimit: number;
    hash: string;
    timestamp: string;
    blockNumber: number;
    status: types.TransactionStatus;

    constructor(info: any) {
        this.privateKey = info.privateKey ? info.privateKey : "";
        this.from = info.from ? info.from : "";
        this.to = info.to ? info.to : "";
        this.value = info.value ? info.value : 0;
        this.gemLimit = info.gemLimit ? info.gemLimit : 0;
        this.hash = info.hash ? info.hash : "";
        this.timestamp = info.timestamp ? info.timestamp : "";;
        this.blockNumber = info.blockNumber ? info.blockNumber : 0;
        this.status = info.status ? info.status : types.TransactionStatus.tsPending;
    }
}

export enum TransactionStatus {
    tsPending = "PENDING",
    tsConfirmed = "CONFIRMED",
    tsDeclined = "DECLINED"
}

export enum NodeType {
    ntFullNode = "FULL",
    ntLightNode = "LIGHT"
}

export enum LogType {
    ltError = "ERROR",
    ltInfo = "INFO"
}

export function ResultObject(_success: boolean, _data: any) {
    if (_success) {
        return {
            success: _success,
            data: _data
        }
    } else {
        return {
            success: _success,
            error: _data
        }
    }
}



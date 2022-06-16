import { LogType } from "../utils/types";
import { Types as MongoTypes } from "mongoose";

export interface ILog {
    id?: MongoTypes.ObjectId,
    type: LogType;
    timestamp: Date;
    message: string;
}

export class Log implements ILog {
    id?: MongoTypes.ObjectId;
    type: LogType;
    timestamp: Date;
    message: string;

    constructor(type: LogType, msg: string, id?: MongoTypes.ObjectId) {
        this.id = id;
        this.type = type;
        this.message = msg;
        this.timestamp = new Date();
    }
} 
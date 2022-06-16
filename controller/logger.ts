import mongoose from 'mongoose';
import { ILog, Log } from '../model/log';
import { LogType } from '../utils/types';

const LogSchema = new mongoose.Schema<ILog>({
    id: mongoose.Types.ObjectId,
    type: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, required: true }
});

const LogModel = mongoose.model<ILog>('Log', LogSchema);

export class Logger {
    dbURI: string;

    constructor(dbURI: string) {
        this.dbURI = dbURI;
    }

    private async addLog(log: Log) {
        try {
            await mongoose.connect(this.dbURI);
            const newLog = new LogModel(log);
            log.id = (await newLog.save())._id;
            console.log(log.id);
        } catch (err) {
            console.log(err);
        }
    }

    async addErrorLog(msg: string) {
        const log = new Log(LogType.ltError, msg);
        await this.addLog(log);
    }

    async addInfoLog(msg: string) {
        const log = new Log(LogType.ltInfo, msg);
        await this.addLog(log);
    }
}
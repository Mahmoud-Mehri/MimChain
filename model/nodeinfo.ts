import { HashGenerator } from "../utils/hashgenerator";

export class NodeInfo {
    host: string;
    port: number;
    hash: string;

    constructor(host: string, port: number) {
        this.host = host;
        this.port = port;
        this.hash = HashGenerator.getInstance().newSha256(host + port);
    }

    get key() {
        return `${this.host}:${this.port}`;
    }
}
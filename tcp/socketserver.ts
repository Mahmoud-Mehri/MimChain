import * as Net from 'net';
import * as config from './config.json';
import { NodeInfo } from './model/nodeinfo';

import { Network } from './controller/network';


const newNode = async (nodeInfo: NodeInfo) => {

}

const newTransaction = async () => {

}

const newBlock = async () => {

}

// Socket Event Handlers
let dataReceived = "";
const newData = (chunk: string) => {
    dataReceived += chunk;
}

const dataFinished = () => {
    // using dataReceived
    dataReceived = "";
}

// Server Event Handlers
const newConnection = (socket: Net.Socket) => {
    socket.on("data", newData);

    socket.on("end", dataFinished);
}

const errorHandler = (error: Error) => {

}

const connectionClosed = (had_error: boolean) => {

}

const serverBoundOnPort = () => {
    console.log(`Server listening on port ${config.tcpPort}`);
}

const socketServer = Net.createServer();
socketServer.listen(config.tcpPort);

socketServer.on("connection", newConnection);
socketServer.on("error", errorHandler);
socketServer.on("close", connectionClosed);
socketServer.on("listening", serverBoundOnPort);

export { socketServer };

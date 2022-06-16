import express from 'express';
import axios from 'axios';

import * as Http from 'http';
import * as Https from 'https';
import * as fs from 'fs';

import { Network } from './controller/network';
import { Transaction } from './model/transaction';
import { Logger } from './controller/logger';
import config from './config.json';

import * as generalMiddle from './middleware/general';
import * as nodeMiddle from './middleware/nodes';
import { NodeInfo } from './model/nodeinfo';

config.httpPort = Number.parseInt(process.argv[2]) || config.httpPort;

const network = new Network();
const logger = new Logger(config.mongodbConnectionString);

const app = express();
app.use(express.json({ limit: '1mb' }));

app.use(generalMiddle.jsonHeaderForResponses);
app.use('/nodes', nodeMiddle.signNode);

app.post('/nodes/register', (req, res) => { // Register new Node and broadcast network
    const nodeInfo = new NodeInfo(req.body.host, req.body.port);
    if (network.registerNode(nodeInfo)) {
        res.send({
            nodes: [...network.nodes.values()],
            transactions: network.transactions,
            difficulty: network.difficulty,
            baseGemFee: network.baseGemFee
        });

        // Broadcasting new node registration to the network
        for (var [hash, node] of network.nodes) {
            // if (node.key == nodeInfo.key) continue;
            axios.post(`http://${node.host}:${node.port}/nodes`, nodeInfo)
                .then((response) => {
                    logger.addInfoLog(`New Node info (${nodeInfo.key}) sent to the node: ${node.key}`);
                    console.log(response.data);
                })
                .catch((err) => {
                    logger.addErrorLog(`Sending new node info(${nodeInfo.key}) to node:${node.key} \
                    failed with message: ${err.message}`);
                })
        }
    }
});

app.post('/nodes', (req, res) => {  // adding new Node to the Node List
    const nodeInfo = req.body;
    console.log(nodeInfo);
    if (network.registerNode(nodeInfo)) {
        res.json({ "success": true });
    }
});

app.post('/transactions/:hash', (req, res) => {
    // ...
});

// const sslOptions = {
//     key: fs.readFileSync(config.sslKeyFile),
//     cert: fs.readFileSync(config.sslCertFile)
// };

var httpServer = Http.createServer(app);
httpServer.listen(config.httpPort, () => {
    console.log(`HTTP Server is listening on port ${config.httpPort}`);
});

// var httpsServer = Https.createServer(sslOptions, app);
// httpsServer.listen(config.httpsPort, () => {
//     console.log(`HTTPS Server is listening on port ${config.httpsPort}`);
// })





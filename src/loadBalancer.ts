import * as http from 'http';
import {IncomingMessage} from "http";
import {ServerResponse} from "node:http";
import {ServerNode} from "./models/server";
import {RoundRobin} from "./algorithms/roundRobin";

const host = 'localhost';
const port = 8000;
const allServers: ServerNode[] = [
    {
        id: 1,
        name: 'alpha',
        url: 'http://localhost:8001'
    },
    {
        id: 2,
        name: 'beta',
        url: 'http://localhost:8002'
    },
    {
        id: 3,
        name: 'gamma',
        url: 'http://localhost:8003'
    },
    {
        id: 4,
        name: 'delta',
        url: 'http://localhost:8004'
    },
];

const algo = new RoundRobin<ServerNode>();

const defaultRequestListener = (req: IncomingMessage, res: ServerResponse) => {
    console.log('Incoming server request');
    const server = algo.elect();
    if (!server) {
        console.log('No servers online to handle. Returning 404');
        res.writeHead(404, 'All servers are off');
        res.end();
        return;
    }
    console.log(`Received request. from ${req.headers['x-forwarded-for']}\n${req.method} ${req.url} HTTP/${req.httpVersion}\nUser-Agent: ${req.headers['user-agent']}\nAccept: ${req.headers['accept']}`);
    res.writeHead(302, {
        'Location': server.url ?? null,
    });
    res.end();
}

const checkServers = async (servers: ServerNode[]) => {
    const statuses = servers.map((server: ServerNode) => fetch(server.url + '/check').then(res => res.status).catch(() => 500));
    const newOnlineServers = [];
    const responses = await Promise.all(statuses);
    for (let i = 0; i < responses.length; i++) {
        if (responses[i] === 200) newOnlineServers.push(servers[i]);
    }

    return algo.list = newOnlineServers;
}

setInterval(() => {
    console.log('Updating...');
    checkServers(allServers).then(r => console.log('Updated servers list', r));
}, 5000);

const loadBalancer = http.createServer(defaultRequestListener);
loadBalancer.listen(port, host, () => {
    console.log(`LB Server listening on port ${port}`);
});
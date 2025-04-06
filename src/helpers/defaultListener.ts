import {IncomingMessage} from "http";
import {ServerResponse} from "node:http";

export const defaultListener = (serverName: string) => {
    return (req: IncomingMessage, res: ServerResponse) => {
        if (req.url !== '/check')
            console.log(`Received request from ${req.headers['\'x-forwarded-for']}\n${req.method} ${req.url} HTTP/${req.httpVersion}\nUser-Agent: ${req.headers['user-agent']}\nAccept: ${req.headers['accept']}`);
        res.writeHead(200);
        res.end(`OK from ${serverName}`);
    };
};
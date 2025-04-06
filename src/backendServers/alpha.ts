import * as http from 'http';
import path from "node:path";
import {defaultOnListen} from "../helpers/defaultOnListen";
import {defaultListener} from "../helpers/defaultListener";

const host = 'localhost';
const port = 8001;
const name = path.basename(__filename, '.ts');

const loadBalancer = http.createServer(defaultListener(name));
loadBalancer.listen(port, host, defaultOnListen(name, port));
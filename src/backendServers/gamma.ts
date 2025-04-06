import * as http from 'http';
import path from "node:path";
import {defaultListener} from "../helpers/defaultListener";
import {defaultOnListen} from "../helpers/defaultOnListen";

const host = 'localhost';
const port = 8003;
const name = path.basename(__filename, '.ts');

const loadBalancer = http.createServer(defaultListener(name));
loadBalancer.listen(port, host, defaultOnListen(name, port));
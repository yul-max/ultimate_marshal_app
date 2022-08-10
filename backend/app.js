import express from 'express';
import path from 'path';
import http from 'http';
import createDebug from 'debug';
import cors from 'cors';

const debug = createDebug('backend:server');

// Routers
import { teamsRouter } from './routes/teams.js';


const app = express();
app.use(express.json());
app.use(cors());

// Routers
app.use('/teams', teamsRouter);

// Creating Server
const port = '3000';
app.set('port', port);
const server = http.createServer(app);

server.listen(port);

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}

server.on('listening', onListening);

export default {
    server
};
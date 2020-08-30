import cors from 'cors';
import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import { Server } from './Server';
import { Logger } from './Logger';

const PORT = 8080;

const app = express();
app.use(cors({
    origin: 'http://localhost:8081',
    credentials: true
}))

const httpServer = http.createServer(http);

const logger = new Logger();
const server = new Server(logger, PORT, app, httpServer);
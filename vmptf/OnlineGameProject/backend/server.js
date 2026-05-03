const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const DB = { lb: './data/leaderboard.json', hist: './data/history.json' };
if (!fs.existsSync('./data')) fs.mkdirSync('./data');
if (!fs.existsSync(DB.lb)) fs.writeFileSync(DB.lb, '[]');
if (!fs.existsSync(DB.hist)) fs.writeFileSync(DB.hist, '[]');

let players = {};
let gameItem = { x: 250, y: 250 };

function spawnItem() {
    gameItem = { x: Math.floor(Math.random()*450)+20, y: Math.floor(Math.random()*450)+20 };
    io.emit('updateItem', gameItem);
}

function sendStats() {
    io.emit('updateStats', { online: Object.keys(players).length });
}

function sendHistory(socket = io) {
    try {
        const hist = JSON.parse(fs.readFileSync(DB.hist, 'utf8'));
        socket.emit('updateHistory', hist.slice(-15).reverse());
    } catch (e) {}
}

io.on('connection', (socket) => {
    socket.on('joinGame', (data) => {
        players[socket.id] = {
            id: socket.id,
            username: data.username || "Гравець",
            x: 250, y: 250, score: 0,
            color: `#${Math.floor(Math.random()*16777215).toString(16)}`
        };
        io.emit('updatePlayers', players);
        socket.emit('updateItem', gameItem);
        sendStats();
        sendHistory(socket);
    });

    socket.on('move', (data) => {
        const p = players[socket.id];
        if (p) {
            p.x = data.x; p.y = data.y;
            const dist = Math.hypot(p.x - gameItem.x, p.y - gameItem.y);
            if (dist < 35) {
                p.score += 1;
                updateGameData(p.username, p.score);
                spawnItem();
            }
            io.emit('updatePlayers', players);
        }
    });

    socket.on('disconnect', () => {
        delete players[socket.id];
        io.emit('updatePlayers', players);
        sendStats();
    });
});

function updateGameData(name, score) {
    try {
        // Оновлення рейтингу
        let lb = JSON.parse(fs.readFileSync(DB.lb, 'utf8'));
        let u = lb.find(x => x.name === name);
        if (u) { if (score > u.score) u.score = score; } else lb.push({ name, score });
        lb.sort((a,b) => b.score - a.score);
        fs.writeFileSync(DB.lb, JSON.stringify(lb.slice(0, 10), null, 2));
        io.emit('refreshLeaderboard', lb.slice(0, 10));

        // Оновлення історії (Рівень 3)
        let hist = JSON.parse(fs.readFileSync(DB.hist, 'utf8'));
        hist.push({ time: new Date().toLocaleString(), user: name });
        fs.writeFileSync(DB.hist, JSON.stringify(hist.slice(-20), null, 2));
        sendHistory();
    } catch (e) {}
}

server.listen(3001, '0.0.0.0', () => console.log("Server OK"));
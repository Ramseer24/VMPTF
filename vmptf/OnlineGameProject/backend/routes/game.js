const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/leaderboard', (req, res) => {
    const data = fs.readFileSync('./data/leaderboard.json');
    res.json(JSON.parse(data));
});

router.post('/score', (req, res) => {
    const { name, score } = req.body;
    let lb = JSON.parse(fs.readFileSync('./data/leaderboard.json'));
    lb.push({ name, score });
    lb.sort((a, b) => b.score - a.score);
    fs.writeFileSync('./data/leaderboard.json', JSON.stringify(lb.slice(0, 10)));
    res.sendStatus(200);
});

module.exports = router;
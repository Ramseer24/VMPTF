const express = require('express');
const router = express.Router();

// Імітація бази даних
let users = [];

router.post('/login', (req, res) => {
    const { username } = req.body;
    if (!username) return res.status(400).json({ error: "Username is required" });

    let user = users.find(u => u.username === username);
    if (!user) {
        user = { id: Date.now(), username, score: 0 };
        users.push(user);
    }
    res.json(user);
});

module.exports = router;
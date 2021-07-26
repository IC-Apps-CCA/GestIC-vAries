const { UserService } = require('../services');
const userService = new UserService();
const verifyJWT = require('../config/configJWT');
const express = require('express');

const router = express.Router();

router.post('/login', async (req, res, next) => {
    try {
        const result = await userService.login(req.body);
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
});

router.post('/register', async (req, res) => {
    try {
        const result = await userService.register({ ...req.body });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
});

router.get('/logout', verifyJWT, async (req, res) => {
    try {
        res.json({ auth: false, token: null });
//        res.redirect('/');
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
});


module.exports = router;

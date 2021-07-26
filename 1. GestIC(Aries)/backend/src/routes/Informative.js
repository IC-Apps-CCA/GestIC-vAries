const { InformativeService } = require('../services');
const informativeService = new InformativeService();
const verifyJWT = require('../config/configJWT');
const express = require('express');

const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const result = await informativeService.getAll({ ...req.body });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const result = await informativeService.getById({
            ...req.params });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
})

router.post('/', verifyJWT, async (req, res) => {
    try {
        const result = await informativeService.insert({
            ...req.body, token: req.token, ownerId: req.userId });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
})

router.put('/', verifyJWT, async (req, res) => {
    try {
        const result = await informativeService.update({
            ...req.body, token: req.token, ownerId: req.userId });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
})

router.delete('/:id', verifyJWT, async (req, res) => {
    try {
        const result = await informativeService.delete({
            ...req.params, token: req.token, ownerId: req.userId });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
})


module.exports = router;

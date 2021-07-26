const { ResearchGroupService } = require('../services');
const groupService = new ResearchGroupService();
const express = require('express');
const verifyJWT = require('../config/configJWT');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await groupService.getAll();
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
});

router.post('/', verifyJWT, async (req, res) => {
    try {
        const result = await groupService.insert({
            ...req.body, token: req.token, ownerId: req.userId});
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
});

router.put('/', verifyJWT, async (req, res) => {
    try {
        const result = await groupService.update({
            ...req.body, token: req.token, ownerId: req.userId });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
});

router.post('/members', verifyJWT, async (req, res) => {
    try {
        const result = await groupService.insertMember({
            ...req.body, token: req.token, ownerId: req.userId });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
})

router.delete('/members', verifyJWT, async (req, res) => {
    try {
        const result = await groupService.deleteMember({
            ...req.body, token: req.token, ownerId: req.userId });
    res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const result = await groupService.getById({ ...req.params });
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
        const result = await groupService.delete({
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

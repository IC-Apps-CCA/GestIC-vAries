const { ProjectService } = require('../services');
const projectService = new ProjectService();
const verifyJWT = require('../config/configJWT');
const express = require('express');

const router = express.Router();

router.post('/', verifyJWT, async (req, res) => {
    try {
        const result = await projectService.insert({
            ...req.body, token: req.token, ownerId: req.userId});
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
        const result = await projectService.update({
            ...req.body, token: req.token, ownerId: req.userId });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
})

router.post('/members', verifyJWT, async (req, res) => {
    try {
        const result = await projectService.insertMember({
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
        const result = await projectService.deleteMember({
            ...req.body, token: req.token, ownerId: req.userId });
    res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
})

router.get('/all/:type?',  async (req, res) => {
    try {
        const result = await projectService.getAll({
            ...req.params });
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
        const result = await projectService.delete({
            ...req.params, token: req.token, ownerId: req.userId });
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
        const result = await projectService.getById({ ...req.params });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
})


module.exports = router;

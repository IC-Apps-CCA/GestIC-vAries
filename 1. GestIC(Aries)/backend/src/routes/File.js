const verifyJWT = require('../config/configJWT');
const multerConfig = require('../config/multerConfig');
const multer = require('multer');
const { FileService } = require('../services')
const fileService = new FileService();
const upload = multer(multerConfig.storage);
const express = require('express');

const router = express.Router();


router.post('/', verifyJWT, upload.single('file'), async (req, res) => {
    const { file } = req;
    try {
        const result = await fileService.insert({
            ...req.body, ref: req.file.filename,
            token: req.token });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
})

router.get('/download', verifyJWT, function (req, res) {
    const file = `${multerConfig.uploadsPath}/${req.body.ref}`;
    res.status(200).download(file);
});

router.get('/', verifyJWT, async (req, res) => {
    try {
        const result = await fileService.getFiles({
            ...req.body, token: req.token });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        (err.code) ?
            res.status(500).json({ message: "Server Internal Error." }) :
            res.status(500).json({ message: err.message });
    }
})

module.exports = router;

const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

module.exports = {
    /**
     * Save files on disk
     */
    storage: {
        storage: multer.diskStorage({
            /**
             * Destination path to save files
             */
            destination: path.resolve(__dirname, 'tmp', 'uploads'),

            /**
             * Filename
             */
            filename: (req, file, cb) => {
                crypto.randomBytes(8, (err, res) => {
                    if (err) return cb(err);

                    return cb(null, res.toString('hex') + path.extname(file.originalname));
                });
            },

        })
    },
    uploadsPath: `${__dirname}/tmp/uploads`
};
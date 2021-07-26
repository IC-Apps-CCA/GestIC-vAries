require('dotenv/config');
const UserService = require('./User');
const allowedProfiles = require('../config/permissions.json').file;

class File {
    constructor() {
        this.fileRepository = new FileRepository();
        this.userService = new UserService();
    }

    insert = async ({
        token,
        name,
        tag,
        ref
    }) => {
        try {

            await this.userService.verifyUserProfile({
                token, validProfileTags: allowedProfiles });
            const insertedFile = await this.fileRepository.insertRow({
                name,
                tag,
                ref
            });

            return insertedFile;
        } catch (err) {
            throw err;
        }
    }

    getFiles = async ({
        token,
        tag = null
    }) => {
        try{

            await this.userService.validateUserProfile({
                token, validProfileTags: allowedProfiles });

            const files = await this.fileRepository.getRows({tag});
            return files;
        } catch(err) {
            throw err;
        }
    }
}

module.exports = File;

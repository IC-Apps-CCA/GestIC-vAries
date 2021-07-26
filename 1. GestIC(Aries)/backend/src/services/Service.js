const UserService = require("./User")
const allwdProf = require('../config/permissions.json');
const db = require('../database/models')

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

class Service {
    constructor(modelName) {
        this.userService = new UserService();
        this.modelName = modelName;
        this.db = db[modelName];
        this.allwdProf = allwdProf[modelName];
    }

    async _validateEditOperation({ token, id, ownerId }) {
        try {
            const item = await this.db.findByPk(id);
            if (!item)
                throw new Error(`${this.modelName.capitalize()} not found.`);
            const isAdmin = await this.userService.validateUserProfile({
                token, validProfileTags: allwdProf.edit });
            const isOwner = ownerId === item.owner;
            if (!isOwner && !isAdmin)
                throw new Error('You have no permission to do this.');
            return item;
        } catch (err) {
            throw err;
        }
    }

    async insert({ token, } ) {
        try {
            await this.userService.verifyUserProfile({
                token, validProfileTags: this.allwdProf.create });
        } catch (err) {
            throw err;
        }
    }

    async getAll() {
        try {
            const items = await this.db.findAll();
            return items;
        } catch (err) {
            throw err;
        }
    }

    async getById ({ id, options=undefined }) {
        try {
            let item;
            if (options) {
                item = await this.db.findByPk(id, options);
            }else {
                item = await this.db.findByPk(id);
            }
            if (!item)
                throw new Error(`${this.modelName.capitalize()} not found.`);
            return item;
        } catch (err) {
            throw err;
        }
    }

    // args = { token, id, ownerId }
    async update (args) {
        try {
            const item = await this._validateEditOperation(args);
            return item;
        } catch (err) {
            throw err;
        }
    }

    // args = { token, id, ownerId }
    async delete (args) {
        try {
            const item = await this._validateEditOperation(args);
            await item.destroy();
            return item;
        } catch (err) {
            throw (err);
        }
    }
}

module.exports = Service;

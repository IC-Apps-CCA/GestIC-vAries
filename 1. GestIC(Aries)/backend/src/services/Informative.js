const UserService = require("./User");
const Service = require('./Service');
const db = require('../database/models')
const uuid = require('uuid');

class Informative extends Service {
    constructor() {
        super('informative');
    }

    async insert({ token, ownerId, title, content }) {
        try {
            await super.insert({ token });
            const info = await db.informative.create({
                id: uuid.v4(),
                owner: ownerId,
                title,
                content,
            });
            return info;
        } catch (err) {
            throw err;
        }
    }

    async update({ token, id, ownerId,
        title = undefined, content = undefined }) {
        try {
            let informative = await super.update({ token, ownerId, id});
            await db.informative.update({
                title: title ? title : informative.title,
                content: content ? content : informative.content,
            }, {
                where: { id },
            });
            informative = await db.informative.findByPk(id);
            return informative;
        } catch (err) {
            throw err;
        }
    }
}


module.exports = Informative;

const UserService = require('./User');
const Service = require('./Service');
const db = require('../database/models');
const uuid = require('uuid');

class ResearchGroup extends Service {
    constructor() {
        super("research");
    }

    async insert({ token, ownerId, name,
        description, activities }) {
        try {
            await super.insert({ token });
            const group = await this.db.create({
                id: uuid.v4(),
                owner: ownerId,
                name,
                description,
                activities });
            return group;
        } catch (err) {
            throw err;
        }
    }

    async getById({ id }) {
        try {
            const options =  {
                include: {
                    association: 'members',
                    attributes: ['id', 'name', 'email'],
                    through: { attributes: [] },
                }
            };
            return await super.getById({ id, options });
        } catch (err) {
            throw err;
        }
    }

    async update({ token, id, ownerId, newOwner = undefined,
        name = undefined, description = undefined,
        activities = undefined, }) {
        try {
            let research = await super.update({ token, ownerId, id});
            await this.db.update({
                owner: newOwner ? newOwner : ownerId,
                name: name ? name : research.name,
                description: description ? description : research.description,
                atctivities: activities ? activities : research.activities,
            },
            {
                where: { id }
            });
            research = await this.db.findByPk(id);
            return research;
        } catch (err) {
            throw err;
        }
    }

    async insertMember({ token, id, userId, ownerId}) {
        try {
            let research = await this._validateEditOperation(
                { token, id, ownerId}
            );

            const user = await db.user.findByPk(userId);
            if (!user) throw new Error('User not found.');
            await research.addMember(user);
            research = await this.db.findByPk(id, {
                include: {
                    association: 'members',
                    attributes: ['id', 'name', 'email'],
                    through: { attributes: [] },
                }
            });
            return research;
        } catch (err) {
            throw err;
        }
    }

    async deleteMember({token, id, userId, ownerId}) {
        try {
            let research = await this._validateEditOperation(
                { token, id, ownerId}
            );

            const user = await db.user.findByPk(userId);
            if (!user) throw new Error('User not found.');
            await research.removeMember(user);
            research = await this.db.findByPk(id, {
                include: {
                    association: 'members',
                    attributes: ['id', 'name', 'email'],
                    through: { attributes: [] },
                }
            });
            return research;
        } catch (err) {
            throw err;
        }
    }
}


module.exports = ResearchGroup;

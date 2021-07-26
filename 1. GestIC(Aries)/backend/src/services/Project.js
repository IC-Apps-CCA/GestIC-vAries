const UserService = require("./User");
const Service = require('./Service');
const db = require('../database/models')
const uuid = require('uuid');

class Project extends Service{
    constructor() {
        super("project");
    }

    async insert({ token, ownerId, name,
        description, type }) {
        try {
            await super.insert({ token });
            const project = await this.db.create({
                id: uuid.v4(),
                owner: ownerId,
                name,
                description,
                type,
            });
            return project;
        } catch (err) {
            throw err;
        }
    }

    async getAll({ type = undefined }){
        try {
            let projects;
            if (type) {
                projects = await this.db.findAll({
                    where: { type }
                })
            } else {
                projects = await this.db.findAll();
            }
            return projects;
        } catch (err) {
            throw err;
        }
    }

    async getById({ id }){
        try {
            const options = {
                include: {
                    association: 'members',
                    attributes: ['id', 'name', 'email'],
                    through: { attributes: [] },
                }
            };
            return await super.getById({id, options});
        } catch (err) {
            throw err;
        }
    }

    async update({ token, id, ownerId,
        newOwner = undefined, name = undefined,
        description = undefined, type = undefined, }){
        try {
            let project = await super.update({ token, ownerId, id });
            await this.db.update({
                owner: newOwner ? newOwner : ownerId,
                name: name ? name : project.name,
                description: description ? description : project.description,
                type: type ? type : project.type,
            },
            {
                where: { id }
            });
            project = await this.db.findByPk(id);
            return project;
        } catch (err) {
            throw err;
        }
    }

    async insertMember({ token, id, userId, ownerId }) {
        try {
            let project = await this._validateEditOperation(
                { token, id, ownerId }
            );

            const user = await db.user.findByPk(userId);
            if (!user) throw new Error('User not found.');
            await project.addMember(user);
            project = await this.db.findByPk(id, {
                include: {
                    association: 'members',
                    attributes: ['id', 'name', 'email'],
                    through: { attributes: [] },
                }
            });
            return project;
        } catch (err) {
            throw err;
        }
    }

    async deleteMember({token, id, userId, ownerId}){
        try {
            let project = await this._validateEditOperation(
                { token, id, ownerId }
            );

            const user = await db.user.findByPk(userId);
            if (!user) throw new Error('User not found.');
            await project.removeMember(user);
            project = await this.db.findByPk(id, {
                include: {
                    association: 'members',
                    attributes: ['id', 'name', 'email'],
                    through: { attributes: [] },
                }
            });
            return project;
        } catch (err) {
            throw err;
        }
    }
}


module.exports = Project;

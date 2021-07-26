require('dotenv/config');
const UserService = require('./User');
const Service = require('./Service');
const db = require('../database/models')
const uuid = require('uuid');

class Offer extends Service {
    constructor() {
        super('offer');
    }

    async insert({ token, ownerId, name, code,
        codeClassroom, linkClassroom, linkMeets,
        linkWpp, linkTel }) {
        try {
            await super.insert({ token });
            const insertedOffer = await db.offer.create({
                id: uuid.v4(),
                owner: ownerId,
                name,
                code,
                codeClassroom,
                linkClassroom,
                linkMeets,
                linkWpp,
                linkTel
            });
            return insertedOffer;
        } catch (err) {
            throw err;
        }
    }

    async update ({
        token,
        id,
        ownerId,
        name = undefined,
        code = undefined,
        codeClassroom = undefined,
        linkClassroom = undefined,
        linkMeets = undefined,
        linkWpp = undefined,
        linkTel = undefined
    }) {
        try {
            let offer = await super.update({ token, ownerId, id });
            await db.offer.update(
                {
                    name: name ? name : offer.name,
                    code: code ? code : offer.code,
                    codeClassroom: codeClassroom ? codeClassroom : offer.codeClassroom,
                    linkClassroom: linkClassroom ? linkClassroom : offer.linkClassroom,
                    linkMeets: linkMeets ? linkMeets : offer.linkMeets,
                    linkWpp: linkWpp ? linkWpp : offer.linkWpp,
                    linkTel: linkTel ? linkTel : offer.linkTel,
                }, {
                    where: { id }
                }
            );
            offer = await db.offer.findByPk(id);
            return offer;
        } catch (err) {
            throw err;
        }
    }

    async deleteAll(token) {
        try {
            await this.userService.verifyUserProfile({
                token, validProfileTags: this.allwdProf.deleteAll });

            const offers = await db.offer.findAll();
            for (let i = 0; i < offers.length; ++i) {
                await offers[i].destroy()
            }
            return offers;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Offer;

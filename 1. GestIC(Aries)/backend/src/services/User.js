require('dotenv/config');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const allowedProfiles = require('../config/permissions.json').user;
const uuid = require('uuid');

const db = require('../database/models')


class User {

    _generateHash = async ({ password }) => {
        try {
            const salt = await bcrypt.genSalt();
            const passHash = await bcrypt.hash(password, salt);
            return passHash;
        } catch (err) {
            throw err
        }
    }

    _validatePassword = async ({ password, passHash }) => {
        return await bcrypt.compare(password, passHash);
    }

    validateUserProfile = async ({ token, validProfileTags = [] }) => {
        try {
            const { id, profileId } = await jwt.verify(token, process.env.SECRET);
            const user = await db.user.findByPk(id);
            const profile = await db.profile.findByPk(profileId);

            if (!user) return false;
            if (validProfileTags.find((prof) => prof === profile.tag)) return true;

            return false;

        } catch (err) {
            throw err
        }
    }

    verifyUserProfile = async ({ token, validProfileTags = [] }) => {
        if (!(await this.validateUserProfile({
                token, validProfileTags }))) {
            throw new Error('Invalid user or profile.');
        }
    }

    login = async ({
        email,
        password
    }) => {
        try {
            const user = await db.user.findOne({
                where: {
                    email
                }
            })
            if (user && await this._validatePassword({
                    password, passHash: user.password }) && user.status) {
                const { id, profileId } = user;
                const profile = await db.profile.findByPk(user.profileId);
                const token = jwt.sign({ id, profileId }, process.env.SECRET, {
                    expiresIn: 9000  // seconds
                });
                return { ...user.get(), profileTag: profile.tag, 
                            auth: true, password: '*******', token };
            } else {
                throw new Error('Invalid Login!');
            }
        } catch (err) {
            throw err
        }
    }

    register = async ({
        name,
        email,
        password,
    }) => {
        try {
            const profile = await db.profile.findOne({
                where: {
                    tag: 'ALUN'
                }
            });
            if (!profile) throw new Error('Invalid tag.');

            const user = await db.user.findOne({
                where: {
                    email
                }
            });

            if (user) throw new Error('Email already in use.')

            password = await this._generateHash({ password });
            const createdUser = await db.user.create({
                id: uuid.v4(),
                profileId: profile.id,
                name,
                email,
                password,
            });

            return {
                ...createdUser.get(),
                password: '*******',
                profileTag: 'ALUN'
            };
        } catch (err) {
            throw err;
        }
    }

    getById = async ({
        token,
        idInToken,
        id,
    }) => {
        try {
            const isAdminProfile = await this.validateUserProfile({
                token, validProfileTags: allowedProfiles });
            const isOwner = (id === idInToken);
            if (!isAdminProfile && !isOwner) {
                    throw new Error('Invalid id or profile.')
            }
            if (!id) id = idInToken;
            const user = await db.user.scope('withoutPassword').findByPk(id);
            const profile = await db.profile.findByPk(user.profileId);
            if (!user) throw new Error('User not found.');
            return { ...user.get(), profileTag: profile.tag };
        } catch (err) {
            throw err;
        }
    }

    getUsers = async ({
        token,
        status = undefined,
    }) => {
        try {

            await this.verifyUserProfile({
                token, validProfileTags: allowedProfiles });
            let users;
            if (status === undefined) {
                users = await db.user.scope('withoutPassword').findAll();
            }
            else {
                users = await db.user.scope('withoutPassword').findAll({
                    where: { status }
                });
            }
            return users;
        } catch (err) {
            throw err;
        }
    }

    update = async ({
        token,
        id,
        idInToken,
        name = undefined,
        status = undefined,
        profileId = undefined,
        old_password = undefined,
        new_password = undefined,
    }) => {
        try {
            const isAdminProfile = await this.validateUserProfile({
                token, validProfileTags: allowedProfiles });
            const isOwner = (id === idInToken);
            if (!isAdminProfile && !isOwner) {
                    throw new Error('Invalid id or profile.')
            }
            let user = await db.user.findByPk(id);
            if (!user) throw new Error('User not found.');
            await db.user.update({ 
                name: name ? name : user.name,
                status: status ? status : user.status,
                profileId: profileId ? profileId : user.profileId,
            }, {
                where: {
                    id
                }
            });
            if (old_password && new_password) {
                this.change_password({id, old_password, new_password});
            }
            user = await db.user.findByPk(id);
            return { ...user.get(), password: '*******' };
        } catch (err) {
            throw err;
        }
    }

    change_password = async ({
        id, old_password, new_password
    }) => {
        try {
            let user = await db.user.findByPk(id); 
            if(!user) throw new Error('User not found.')
            if (!(await this._validatePassword({
                password: old_password, passHash: user.password }))){
                throw new Error("Old password doesn't match.");
            }
            new_password = await this._generateHash({
                password: new_password });
            await db.user.update({
                password: new_password,
            }, {
                where: { id }
            });
        } catch (err) {
            throw err;
        }
    }

    deleteById = async ({
        token,
        id
    }) => {
        try {
            await this.verifyUserProfile({
                token, validProfileTags: allowedProfiles });
            const user = await db.user.findByPk(id);
            if (!user) throw new Error('Invalid Id.')

            await user.destroy()

            return { ...user.get() }
        } catch (err) {
            throw err;
        }
    }

}

module.exports = User;

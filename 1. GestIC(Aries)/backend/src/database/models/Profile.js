'use strict';
module.exports = (sequelize, Sequelize) => {
    const Profile = sequelize.define('profile', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            field: 'prof_id'
        },
        tag: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'prof_tag'
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING,
            field: 'prof_name'
        },
    }, {
        timestamps: true
    })

    return Profile;
}

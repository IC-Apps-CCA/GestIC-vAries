'use strict';
module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define('event', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            field: 'event_id'
        },
        owner: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            field: 'owner_id'
        },
        start: {
            allowNull: false,
            type: Sequelize.DATE,
            field: 'event_start',
        },
        end: {
            allowNull: false,
            type: Sequelize.DATE,
            field: 'event_end',
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'event_title',
        },
        description: {
            type: Sequelize.STRING,
            field: 'event_description',
        },
    }, {
        timestamps: true
    });

    Event.associate = (models) => {
        Event.belongsTo(models.user, { 
            foreignKey: 'owner',
            as: 'ownerInfo',
        });
    };

    return Event;
}

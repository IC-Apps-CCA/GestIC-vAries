'use strict';
module.exports = (sequelize, Sequelize) => {
    const Informative = sequelize.define('informative', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            field: 'info_id'
        },
        owner: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            field: 'owner_id'
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'info_title',
        },
        content: {
            allowNull: false,
            type: Sequelize.STRING(500),
            field: 'info_content',
        },
    }, {
        timestamps: true
    });

    Informative.associate = (models) => {
        Informative.belongsTo(models.user, { 
            foreignKey: 'owner',
            as: 'ownerInfo',
        });
    };

    return Informative;
}

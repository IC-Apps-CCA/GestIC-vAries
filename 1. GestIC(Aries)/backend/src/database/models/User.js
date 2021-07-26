'use strict';
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            field: 'user_id'
        },
        profileId: {
            type: Sequelize.UUID,
            allowNull: false,
            field: 'prof_id'
        },
        name: {
            allowNull: false,
            type: Sequelize.STRING,
            field: 'user_name'
        },
        email: {
            allowNull: false,
            type: Sequelize.STRING,
            field: 'user_email'
        },
        password: {
            allowNull: false,
            type: Sequelize.STRING,
            field: 'user_password'
        },
        status: {
            allowNull: false,
            type: Sequelize.BOOLEAN,
            field: 'user_status',
            defaultValue: true
        },
    }, {
        timestamps: true,
        scopes: {
            withoutPassword: {
                attributes: { exclude: ['password'] },
            }
        }
    })

    User.associate = (models) => {
        User.hasOne(models.profile, { foreignKey: 'id' });
        User.hasMany(models.informative, { 
            foreignKey: 'owner',
            as: 'informatives',
        })
        User.hasMany(models.offer, { 
            foreignKey: 'owner',
            as: 'offers',
        })
        User.belongsToMany(models.research, { 
            foreignKey: 'user_id',
            through: 'rsrch_members',
            as: 'research_groups',
            });
        User.belongsToMany(models.project, {
            foreignKey: 'user_id',
            through: 'proj_members',
            as: 'projects'
        });
    }

    return User;
}

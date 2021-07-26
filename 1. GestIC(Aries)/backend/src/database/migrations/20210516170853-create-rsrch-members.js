'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rsrch_members', {
        rsrch_id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            references: { model: 'researches', key: 'rsrch_id'},
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        user_id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
            references: { model: 'users', key: 'user_id'},
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        }
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable('rsrch_members');
  }
};

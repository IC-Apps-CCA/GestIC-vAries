'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('events', {
        event_id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
        },
        owner_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'user_id' },
      },
        event_start: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        event_end: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        event_title: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        event_description: {
            type: Sequelize.STRING(500),
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
        }
      });
    },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('events')
  }
};

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('researches', {
        rsrch_id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.UUID,
        },
        owner_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: { model: 'users', key: 'user_id' },
      },
        rsrch_name: {
            allowNull: false,
            type: Sequelize.STRING,
        },
        rsrch_description: {
            allowNull: false,
            type: Sequelize.TEXT,
        },
        rsrch_activities: {
            allowNull: false,
            type: Sequelize.TEXT,
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
    queryInterface.dropTable('researches');
  }
};

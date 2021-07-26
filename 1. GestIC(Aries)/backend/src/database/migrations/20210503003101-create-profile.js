'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('profiles', {
      prof_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      prof_tag: {
        allowNull: false,
        type: Sequelize.STRING
      },
      prof_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('profiles')
  }
};

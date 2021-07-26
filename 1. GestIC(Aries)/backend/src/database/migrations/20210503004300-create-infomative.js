'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('informatives', {
      info_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      owner_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        references: { model: 'users', key: 'user_id'},
        onUpdate: 'CASCADE'
      },
      info_title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      info_content: {
        allowNull: false,
        type: Sequelize.STRING(500)
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
    await queryInterface.dropTable('informatives');
  }
};

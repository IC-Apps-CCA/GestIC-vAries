'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('proj_members', [
      {
        proj_id: 'a2c70423-b13b-4850-a7df-ee164a2cd40f',
        user_id: 'f9584d5c-b11e-4148-8e12-e124782f9b9c',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        proj_id: 'a2c70423-b13b-4850-a7df-ee164a2cd40f',
        user_id: 'cb1e0a9e-a9d7-447e-8429-0a0328dcf12c',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('proj_members', {
      proj_id : 'a2c70423-b13b-4850-a7df-ee164a2cd40f',
    });
  }
};


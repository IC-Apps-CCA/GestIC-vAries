'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('rsrch_members', [
      {
        rsrch_id: '4f8341c9-c4ab-46c9-94b6-35a1e3b5d762',
        user_id: 'f9584d5c-b11e-4148-8e12-e124782f9b9c',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        rsrch_id: '4f8341c9-c4ab-46c9-94b6-35a1e3b5d762',
        user_id: '6d9f75cd-803f-4380-9e07-ac03403e9973',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('rsrch_members', {
      rsrch_id : '4f8341c9-c4ab-46c9-94b6-35a1e3b5d762',
    });
  }
};

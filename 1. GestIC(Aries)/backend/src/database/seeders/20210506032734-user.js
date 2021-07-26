'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('users', [
      {
        user_id: 'f9584d5c-b11e-4148-8e12-e124782f9b9c',
        prof_id: '285021ca-0510-45cb-ba3c-4f6ad019d0f1',
        user_name: 'coord1',
        user_email: 'coord1@ic.ufal.br',
        user_password: '$2b$10$7NoIELKFMijldCzQgfEQq./fMogwKLTHWSBVxNGtF0965kNMtRwem', // 1234
        user_status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: '6d9f75cd-803f-4380-9e07-ac03403e9973',
        prof_id: '285021ca-0510-45cb-ba3c-4f6ad019d0f1',
        user_name: 'coord2',
        user_email: 'coord2@ic.ufal.br',
        user_password: '$2b$10$7NoIELKFMijldCzQgfEQq./fMogwKLTHWSBVxNGtF0965kNMtRwem', // 1234
        user_status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        user_id: 'cb1e0a9e-a9d7-447e-8429-0a0328dcf12c',
        prof_id: '3a2744c1-fa73-43f1-bceb-a8cee76e5f35',
        user_name: 'aluno1',
        user_email: 'aluno1@ic.ufal.br',
        user_password: '$2b$10$7NoIELKFMijldCzQgfEQq./fMogwKLTHWSBVxNGtF0965kNMtRwem', // 1234
        user_status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('users', {
      user_id: ['f9584d5c-b11e-4148-8e12-e124782f9b9c',
                '6d9f75cd-803f-4380-9e07-ac03403e9973',
                'cb1e0a9e-a9d7-447e-8429-0a0328dcf12c',
    ]
    })
  }
};

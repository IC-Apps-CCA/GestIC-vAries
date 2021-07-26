'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('projects', [
      {
        proj_id: '61e39696-434a-4e2b-89a0-4489751e7834',
        owner_id: 'f9584d5c-b11e-4148-8e12-e124782f9b9c',
        proj_name: 'MusIC',
        proj_description: 'Grupo de amantes de música com o intuito de conhecer gente com os mesmo interesses e fazer muita música!',
        proj_type: 'PIBIT',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        proj_id: 'a2c70423-b13b-4850-a7df-ee164a2cd40f',
        owner_id: 'f9584d5c-b11e-4148-8e12-e124782f9b9c',
        proj_name: 'Secomp',
        proj_description: 'A Semana de Computação do IC tem o intuito de levar bastante informação para os membros da comunidade e gerar discussões sobre os mais variados assuntos no campus.',
        proj_type: 'PIBIC',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('projects', {
      proj_id: ['61e39696-434a-4e2b-89a0-4489751e7834',
      'a2c70423-b13b-4850-a7df-ee164a2cd40f',
    ]});
  }
};

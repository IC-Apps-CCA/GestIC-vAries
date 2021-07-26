'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('profiles', [
      {
        prof_id: '3a2744c1-fa73-43f1-bceb-a8cee76e5f35',
        prof_tag: 'ALUN',
        prof_name: 'ALUNO',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        prof_id: '70039c9e-5c27-41fc-bd5a-ac4f00968887',
        prof_tag: 'COOR',
        prof_name: 'COORDENADOR',
        createdAt: new Date(),
        updatedAt: new Date(),
      }, 
      {
        prof_id: '285021ca-0510-45cb-ba3c-4f6ad019d0f1',
        prof_tag: 'TEC',
        prof_name: 'TECNICO',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        prof_id: 'a00d58bf-e7b9-411e-a408-e93bb9c37d08',
        prof_tag: 'PROF',
        prof_name: 'PROFESSOR',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('profiles', {
      prof_id: ['3a2744c1-fa73-43f1-bceb-a8cee76e5f35',
                '70039c9e-5c27-41fc-bd5a-ac4f00968887',
                '285021ca-0510-45cb-ba3c-4f6ad019d0f1',
                'a00d58bf-e7b9-411e-a408-e93bb9c37d08',
                ],
    })
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkInsert('offers', [
      {
        offer_id: '16d4ecd9-4441-4998-9788-d81f7e613df7',
        owner_id: 'f9584d5c-b11e-4148-8e12-e124782f9b9c',
        offer_name: 'Circuitos Elétricos',
        offer_code: 'ECOM028',
        offer_code_classroom: 'm33NS1n3',
        offer_link_classroom: 'https://www.google.com/',
        offer_link_meets: 'https://meet.google.com/huk-bcqq-cns',
        offer_link_wpp: 'https://chat.whatsapp.com/J9HJx7IvMAA5n3pY4J6QQL',
        offer_link_tel: 'https://web.telegram.org',
        createdAt: new Date(),
				updatedAt: new Date(),     
      },
      {
        offer_id: '0527207b-6070-4743-af4c-2b0b052da159',
        owner_id: 'f9584d5c-b11e-4148-8e12-e124782f9b9c',
        offer_name: 'Projeto e Análise de Algoritmos',
        offer_code: 'ECOM027',
        offer_code_classroom: 'n40me3NS1n3',
        offer_link_classroom: 'https://www.youtube.com/',
        offer_link_meets: 'https://meet.google.com/hug-bcrq-cys',
        offer_link_wpp: 'https://chat.whatsapp.com/KwklhCL5kcl7t3Rud7pFiQ',
        offer_link_tel: 'https://web.telegram.org',
        createdAt: new Date(),
				updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete('offers', {
      offer_id: ['16d4ecd9-4441-4998-9788-d81f7e613df7', '0527207b-6070-4743-af4c-2b0b052da159']
    })
  }
};

module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Meals', [{
        title: 'Test Meal 1',
        description: 'Test',
        image: 'image3.jpg',
        price: 11.6,
        defaultQuantity: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: 'Test Meal 2',
        description: 'Test',
        image: 'image3.jpg',
        price: 11.6,
        defaultQuantity: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        title: 'Test Meal 2',
        description: 'Test',
        image: 'image3.jpg',
        price: 11.6,
        defaultQuantity: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
    }]),
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    down: queryInterface => queryInterface.bulkDelete('Meals', { description: 'test' }),
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */       
    // },
};

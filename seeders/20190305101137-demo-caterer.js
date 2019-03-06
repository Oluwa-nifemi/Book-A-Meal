module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Caterers', [{
        name: 'Test Caterer',
        email: 'testcaterer@gmail.com',
        password: 'testpassword',
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
    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Caterers', { email: 'testcaterer@gmail.com' }),
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
};

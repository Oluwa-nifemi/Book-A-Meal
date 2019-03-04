module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.addColumn('Orders', 'address', {
        type: Sequelize.STRING,
    }),

    down: queryInterface => queryInterface.removeColumn('Orders', 'address'),
};

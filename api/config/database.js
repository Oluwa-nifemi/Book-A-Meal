import Sequelize from 'sequelize';

const db = new Sequelize('Book-A-Meal', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    logging: false,
});

export default db;

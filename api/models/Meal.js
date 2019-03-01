import Sequelize from 'sequelize';
import db from '../config/database';

const Meal = db.define('meal', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
    image: {
        type: Sequelize.STRING,
    },
    price: {
        type: Sequelize.FLOAT,
    },
    defaultQuantity: {
        type: Sequelize.INTEGER,
    },
});

export default Meal;

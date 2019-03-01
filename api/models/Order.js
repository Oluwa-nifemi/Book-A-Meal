import Sequelize from 'sequelize';
import db from '../config/database';

const Order = db.define('Order', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    state: {
        type: Sequelize.STRING,
        defaultValue: 'pending',
    },
    date: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
    },
});

export default Order;

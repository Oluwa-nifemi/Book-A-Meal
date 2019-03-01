import Sequelize from 'sequelize';
import db from '../config/database';

const OrderItem = db.define('OrderItem', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    quantity: {
        type: Sequelize.INTEGER,
    },
    status: {
        type: Sequelize.STRING,
        defaultValue: 'cart'
    },
});

export default OrderItem;

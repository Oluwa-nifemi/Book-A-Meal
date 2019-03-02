import Sequelize from 'sequelize';
import db from '../config/database';

const Menu = db.define('Menu', {
    date: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
    },
    meals: {
        type: Sequelize.ARRAY(Sequelize.JSON),
        defaultValue: [],
    },
});

export default Menu;

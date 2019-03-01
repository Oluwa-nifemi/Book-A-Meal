import Sequelize from 'sequelize';
import db from '../config/database';

const Menu = db.define('Menu', {
    date: {
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.NOW,
    },
    meals: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
    },
});

export default Menu;

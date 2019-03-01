import Sequelize from 'sequelize';
import db from '../config/database';

const Menu = db.define('Menu', {
    date: Sequelize.DATEONLY,
    meals: Sequelize.ARRAY(Sequelize.TEXT),
});

export default Menu;

import Sequelize from 'sequelize';
import db from '../config/database';

const Caterer = db.define('Caterer', {
    name: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
    },
});

export default Caterer;

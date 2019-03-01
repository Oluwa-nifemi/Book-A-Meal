import Sequelize from 'sequelize';
import db from '../config/database';

const User = db.define('User', {
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

export default User;
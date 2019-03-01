import express from 'express';
import db from './config/database';
import routes from './routes/routes';
import Meal from './models/Meal';
import Menu from './models/Menu';
import OrderItem from './models/OrderItem';
import Order from './models/Order';
import User from './models/User';

const app = express();

// Associations
Order.belongsTo(User);
User.hasMany(Order);

OrderItem.belongsTo(Order);
Order.hasMany(OrderItem);

OrderItem.belongsTo(User);
User.hasMany(OrderItem);

Meal.belongsToMany(OrderItem, { through: 'ItemMeal' });

db.sync()
    .then(() => {
        console.log('Connection established');
    })
    .catch(console.log);

const PORT = process.env.PORT || 3000;

app.use('/api/v1', routes);

app.listen(PORT);

export default app;

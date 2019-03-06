import '@babel/polyfill';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swaggerdocs.json';
import db from './config/database';
import routes from './routes/routes';
import Meal from './models/Meal';
import Menu from './models/Menu';
import OrderItem from './models/OrderItem';
import Order from './models/Order';
import User from './models/User';
import Caterer from './models/Caterer';

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Associations
Order.belongsTo(User);
User.hasMany(Order);

OrderItem.belongsTo(Order);
Order.hasMany(OrderItem);

OrderItem.belongsTo(User);
User.hasMany(OrderItem);

Meal.belongsToMany(OrderItem, { through: 'ItemMeal' });
OrderItem.belongsToMany(Meal, { through: 'ItemMeal' });

const PORT = process.env.PORT || 4000;

app.use('/api/v1', routes);

db.sync()
    .then(() => {
        console.log('Connection established');
        app.emit('connected');
        app.listen(PORT);
    })
    .catch(console.log);

export default app;

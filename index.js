import express from 'express';
import Meal from './models/meal';
import Menu from './models/menu';
import OrderItem from './models/order-item';
import Order from './models/order';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

//  MEAL ROUTES
app.get('/api/v1/meals', (req, res) => {
    const meal = Meal.fetchMeals();
    res.json(meal);
});

app.post('/api/v1/meals', (req, res) => {
    const meal = new Meal({ ...req.body });
    res.json(meal.add());
});

app.put('/api/v1/meals/:id', (req, res) => {
    const meal = new Meal({ ...req.body });
    res.json(meal.update(parseInt(req.params.id, 10)));
});

app.delete('/api/v1/meals/:id', (req, res) => {
    try {
        Meal.delete(parseInt(req.params.id, 10));
        res.status(204).json();
    } catch (err) {
        res.json({ err: err.message });
    }
});

//  MENU ROUTES
app.get('/api/v1/menu', (req, res) => {
    res.json(Menu.getMenu());
});

app.post('/api/v1/menu', (req, res) => {
    res.json(Menu.addMeal(req.body));
});

app.put('/api/v1/menu', (req, res) => {
    res.json(Menu.editMeal(req.body));
});

app.delete('/api/v1/menu/:id', (req, res) => {
    Menu.deleteMeal(parseInt(req.params.id, 10));
    res.status(204).send();
});

//  ORDER ITEM ROUTES
app.get('/api/v1/order-items/:userid', (req, res) => {
    res.json(OrderItem.getOrderItems(parseInt(req.params.userid, 10)));
});

app.post('/api/v1/order-items', (req, res) => {
    const orderItem = new OrderItem(req.body);
    res.json(orderItem.add());
});

app.put('/api/v1/order-items', (req, res) => {
    res.json(OrderItem.edit(req.body));
});

app.delete('/api/v1/order-items/:id', (req, res) => {
    OrderItem.delete(parseInt(req.params.id, 10));
    res.status(204).send();
});

//  ORDER ROUTES
app.get('/api/v1/orders', (req, res) => {
    res.json(Order.getOrders());
});

app.get('/api/v1/orders/:userid', (req, res) => {
    res.json(Order.getUserOrders(parseInt(req.params.userid, 10)));
});

app.post('/api/v1/orders', (req, res) => {
    const order = new Order(req.body);
    res.json(order.add());
});

app.put('/api/v1/orders/:id/:state', (req, res) => {
    Order.editState(parseInt(req.params.id, 10), req.params.state);
    res.status(200).send();
});
app.listen(PORT);

export default app;

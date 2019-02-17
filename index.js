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
    res.send(meal);
});

app.post('/api/v1/meals', (req, res) => {
    const meal = new Meal({ ...req.body });
    res.send(meal.add());
});

app.put('/api/v1/meals/:id', (req, res) => {
    const meal = new Meal({ ...req.body });
    res.send(meal.update(parseInt(req.params.id, 10)));
});

app.delete('/api/v1/meals/:id', (req, res) => {
    try {
        Meal.delete(parseInt(req.params.id, 10));
        res.status(204).send();
    } catch (err) {
        res.send({ err: err.message });
    }
});

//  MENU ROUTES
app.get('/api/v1/menu', (req, res) => {
    res.send(Menu.getMenu());
});

app.post('/api/v1/menu', (req, res) => {
    res.send(Menu.addMeal(req.body));
});

app.put('/api/v1/menu', (req, res) => {
    res.send(Menu.editMeal(req.body));
});

//  ORDER ITEM ROUTES
app.get('/api/v1/order-items/:userid', (req, res) => {
    res.send(OrderItem.getOrderItems(parseInt(req.params.userid, 10)));
});

app.post('/api/v1/order-items', (req, res) => {
    const orderItem = new OrderItem(req.body);
    res.send(orderItem.add());
});

app.put('/api/v1/order-items', (req, res) => {
    res.send(OrderItem.edit(req.body))
})
app.listen(PORT);

import express from 'express';
import Meal from '../controllers/meal';
import Menu from '../controllers/menu';
import OrderItem from '../controllers/order-item';
import Order from '../controllers/order';

const router = express.Router();

router.use(express.json());

//  MEAL ROUTES
router.get('/meals', (req, res) => {
    const meal = Meal.fetchMeals();
    res.json(meal);
});

router.post('/meals', (req, res) => {
    const meal = new Meal({ ...req.body });
    meal.add()
        .then(m => m.dataValues)
        .then((data) => {
            res.status(200).send(data);
        })
        .catch(console.log);
});

router.put('/meals/:id', (req, res) => {
    const meal = new Meal({ ...req.body });
    res.json(meal.update(parseInt(req.params.id, 10)));
});

router.delete('/meals/:id', (req, res) => {
    try {
        Meal.delete(parseInt(req.params.id, 10));
        res.status(204).json();
    } catch (err) {
        res.json({ err: err.message });
    }
});

//  MENU ROUTES
router.get('/menu', (req, res) => {
    res.json(Menu.getMenu());
});

router.post('/menu', (req, res) => {
    res.json(Menu.addMeal(req.body));
});

router.put('/menu', (req, res) => {
    res.json(Menu.editMeal(req.body));
});

router.delete('/menu/:id', (req, res) => {
    Menu.deleteMeal(parseInt(req.params.id, 10));
    res.status(204).send();
});

//  ORDER ITEM ROUTES
router.get('/order-items/:userid', (req, res) => {
    res.json(OrderItem.getOrderItems(parseInt(req.params.userid, 10)));
});

router.post('/order-items', (req, res) => {
    const orderItem = new OrderItem(req.body);
    res.json(orderItem.add());
});

router.put('/order-items', (req, res) => {
    res.json(OrderItem.edit(req.body));
});

router.delete('/order-items/:id', (req, res) => {
    OrderItem.delete(parseInt(req.params.id, 10));
    res.status(204).send();
});

//  ORDER ROUTES
router.get('/orders', (req, res) => {
    res.json(Order.getOrders());
});

router.get('/orders/:userid', (req, res) => {
    res.json(Order.getUserOrders(parseInt(req.params.userid, 10)));
});

router.post('/orders', (req, res) => {
    const order = new Order(req.body);
    res.json(order.add());
});

router.put('/orders/:id/:state', (req, res) => {
    Order.editState(parseInt(req.params.id, 10), req.params.state);
    res.status(200).send();
});

router.delete('/orders/:id', (req, res) => {
    Order.delete(parseInt(req.params.id, 10));
    res.status(200).send();
});

export default router;

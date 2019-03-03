import express from 'express';
import Meal from '../controllers/meal';
import Menu from '../controllers/menu';
import OrderItem from '../controllers/order-item';
import Order from '../controllers/order';
import User from '../controllers/user';
import order from '../controllers/order';

const router = express.Router();

router.use(express.json());

//  MEAL ROUTES
router.get('/meals', (req, res) => {
    Meal.fetchMeals()
        .then((meals) => {
            res.status(200).send(meals);
        })
        .catch(console.log);
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
    Meal.update(req.body, parseInt(req.params.id, 10))
        .then((meal) => {
            res.status(200).send(meal);
        });
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
    Menu.getMenu()
        .then((m) => {
            res.status(200).send(m);
        })
        .catch(console.log);
});

router.post('/menu', (req, res) => {
    Menu.addMeal(req.body)
        .then((meal) => {
            res.status(meal.code).send(meal);
        });
});

router.put('/menu', (req, res) => {
    Menu.editMeal(req.body)
        .then((meal) => {
            res.status(meal.code).send(meal);
        });
});

router.delete('/menu/:id', (req, res) => {
    Menu.deleteMeal(parseInt(req.params.id, 10))
        .then((meal) => {
            res.status(meal.code).send(meal);
        });
});

//  ORDER ITEM ROUTES
router.get('/order-items/:userid', (req, res) => {
    OrderItem.getOrderItems(parseInt(req.params.userid, 10))
        .then((orders) => {
            res.send(orders);
        });
});

router.post('/order-items', (req, res) => {
    OrderItem.add(req.body)
        .then((item) => {
            res.status(item.code).send(item);
        });
});

router.put('/order-items', (req, res) => {
    OrderItem.edit(req.body)
        .then((data) => {
            res.status(data.code).send(data);
        });
});

router.delete('/order-items/:id', (req, res) => {
    OrderItem.delete(parseInt(req.params.id, 10))
        .then(() => {
            res.status(204).send();
        });
});

//  ORDER ROUTES
router.get('/orders', (req, res) => {
    Order.getOrders()
        .then((orders) => {
            res.status(200).send(orders);
        });
});

router.get('/orders/:userid', (req, res) => {
    Order.getUserOrders(parseInt(req.params.userid, 10))
        .then((orders) => {
            res.status(200).send(orders);
        });
});

router.post('/orders', (req, res) => {
    Order.add(req.body)
        .then((order) => {
            res.status(order.code).send(order);
        });
});

router.put('/orders/:id/:state', (req, res) => {
    Order.editState(parseInt(req.params.id, 10), req.params.state)
        .then((orderObj) => {
            res.status(orderObj.code).send(orderObj);
        });
});

router.delete('/orders/:id', (req, res) => {
    Order.delete(parseInt(req.params.id, 10))
        .then((response) => {
            res.status(response.code).send(response);
        });
});

// USER ROUTES
router.post('/users/login', (req, res) => {
    User.login(req.body)
        .then((status) => {
            res.status(status.code).send(status);
        });
});

router.post('/users/signup', (req, res) => {
    User.signup(req.body)
        .then((user) => {
            res.status(200).send(user);
        })
        .catch((err) => {
            if (err.errors) {
                const errorMessages = [];
                err.errors.forEach((e) => {
                    errorMessages.push(e.message);
                });
                res.status(409).send(errorMessages);
            }
        });
});
export default router;

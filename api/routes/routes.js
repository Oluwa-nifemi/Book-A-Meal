import express from 'express';
import Meal from '../controllers/meal';
import Menu from '../controllers/menu';
import OrderItem from '../controllers/order-item';
import Order from '../controllers/order';
import User from '../controllers/user';

const router = express.Router();

router.use(express.json());

//  MEAL ROUTES
router.get('/meals', Meal.fetchMeals);

router.post('/meals', Meal.add);

router.put('/meals/:id', Meal.update);

router.delete('/meals/:id', Meal.delete);

//  MENU ROUTES
router.get('/menu', Menu.getMenu);

router.post('/menu', Menu.addMeal);

router.put('/menu', Menu.editMeal);

router.delete('/menu/:id', Menu.deleteMeal);

//  ORDER ITEM ROUTES
router.get('/order-items/:userid', OrderItem.getOrderItems);

router.post('/order-items', OrderItem.add);

router.put('/order-items', OrderItem.edit);

router.delete('/order-items/:id', OrderItem.delete);

//  ORDER ROUTES
router.get('/orders', Order.getOrders);

router.get('/orders/:userid', Order.getUserOrders);

router.post('/orders', Order.add);

router.put('/orders/:id/:state', Order.editState);

router.delete('/orders/:id', Order.delete);
// USER ROUTES
router.post('/users/login', User.login);

router.post('/users/signup', User.signup);

export default router;

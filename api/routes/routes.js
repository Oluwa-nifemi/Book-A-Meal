import express from 'express';
import Meal from '../controllers/meal';
import Menu from '../controllers/menu';
import OrderItem from '../controllers/order-item';
import Order from '../controllers/order';
import User from '../controllers/user';
import Auth from '../controllers/auth';
import Caterer from '../controllers/caterer';

const router = express.Router();

router.use(express.json());

//  MEAL ROUTES
router.get('/meals', Auth.confirmToken, Auth.confirmCaterer, Meal.fetchMeals);

router.post('/meals', Auth.confirmToken, Auth.confirmCaterer, Meal.add);

router.put('/meals/:id', Auth.confirmToken, Auth.confirmCaterer, Meal.update);

router.delete('/meals/:id', Auth.confirmToken, Auth.confirmCaterer, Meal.delete);

//  MENU ROUTES
router.get('/menu', Auth.confirmToken, Menu.getMenu);

router.post('/menu', Auth.confirmToken, Menu.addMeal);

router.put('/menu', Auth.confirmToken, Menu.editMeal);

router.delete('/menu/:id', Auth.confirmToken, Menu.deleteMeal);

//  ORDER ITEM ROUTES
router.get('/order-items/:userid', Auth.confirmToken, OrderItem.getOrderItems);

router.post('/order-items', Auth.confirmToken, OrderItem.add);

router.put('/order-items', Auth.confirmToken, OrderItem.edit);

router.delete('/order-items/:id', Auth.confirmToken, OrderItem.delete);

//  ORDER ROUTES
router.get('/orders', Auth.confirmToken, Order.getOrders);

router.get('/orders/:userid', Auth.confirmToken, Order.getUserOrders);

router.post('/orders', Auth.confirmToken, Order.add);

router.put('/orders/:id/:state', Auth.confirmToken, Order.editState);

router.delete('/orders/:id', Auth.confirmToken, Order.delete);
// USER ROUTES
router.post('/users/login', User.login);

router.post('/users/signup', User.signup);

//  CATERER ROUTES
router.post('/caterers/login', Caterer.login);

router.post('/caterers/signup', Caterer.signup);

export default router;

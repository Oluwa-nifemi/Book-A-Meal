import express from 'express';
import Meal from '../controllers/meal';
import Menu from '../controllers/menu';
import OrderItem from '../controllers/order-item';
import Order from '../controllers/order';
import User from '../controllers/user';
import Auth from '../controllers/auth';
import Caterer from '../controllers/caterer';
import UserAuth from '../middleware/user';
import MealAuth from '../middleware/meal';
import MenuAuth from '../middleware/menu';
import OrderItemAuth from '../middleware/order-item';
import OrderAuth from '../middleware/order';

const router = express.Router();

router.use(express.json());

//  MEAL ROUTES
router.get('/meals', Auth.confirmToken, Auth.confirmCaterer, Meal.fetchMeals);

router.post('/meals', Auth.confirmToken, Auth.confirmCaterer, MealAuth.validate, Meal.add);

router.put('/meals/:id', Auth.confirmToken, Auth.confirmCaterer, MealAuth.validate, Meal.update);

router.delete('/meals/:id', Auth.confirmToken, Auth.confirmCaterer, Meal.delete);

//  MENU ROUTES
router.get('/menu', Auth.confirmToken, Menu.getMenu);

router.post('/menu', Auth.confirmToken, Auth.confirmCaterer, MenuAuth.validate, Menu.addMeal);

router.put('/menu', Auth.confirmToken, Auth.confirmCaterer, MenuAuth.validate, Menu.editMeal);

router.delete('/menu/:id', Auth.confirmToken, Auth.confirmCaterer, Menu.deleteMeal);

//  ORDER ITEM ROUTES
router.get('/order-items/:userid', Auth.confirmToken, OrderItem.getOrderItems);

router.post('/order-items', Auth.confirmToken, OrderItemAuth.add, OrderItem.checkifExists, OrderItem.add);

router.put('/order-items', Auth.confirmToken, OrderItemAuth.edit, OrderItem.edit);

router.delete('/order-items/:id', Auth.confirmToken, OrderItem.delete);

//  ORDER ROUTES
router.get('/orders', Auth.confirmToken, Auth.confirmCaterer, Order.getOrders);

router.get('/orders/:userid', Auth.confirmToken, Order.getUserOrders);

router.post('/orders', Auth.confirmToken, OrderAuth.validate, Order.add);

router.put('/orders/:id/:state', Auth.confirmToken, Auth.confirmCaterer, Order.editState);

router.delete('/orders/:id', Auth.confirmToken, Order.delete);

// USER ROUTES
router.post('/users/login', UserAuth.login, User.login);

router.post('/users/signup', UserAuth.signup, User.signup);

//  CATERER ROUTES
router.post('/caterers/login', UserAuth.login, Caterer.login);

router.post('/caterers/signup', UserAuth.signup, Caterer.signup);

export default router;

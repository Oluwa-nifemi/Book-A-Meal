"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _meal = _interopRequireDefault(require("../controllers/meal"));

var _menu = _interopRequireDefault(require("../controllers/menu"));

var _orderItem = _interopRequireDefault(require("../controllers/order-item"));

var _order = _interopRequireDefault(require("../controllers/order"));

var _user = _interopRequireDefault(require("../controllers/user"));

var _auth = _interopRequireDefault(require("../controllers/auth"));

var _caterer = _interopRequireDefault(require("../controllers/caterer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.use(_express.default.json()); //  MEAL ROUTES

router.get('/meals', _auth.default.confirmToken, _auth.default.confirmCaterer, _meal.default.fetchMeals);
router.post('/meals', _auth.default.confirmToken, _auth.default.confirmCaterer, _meal.default.add);
router.put('/meals/:id', _auth.default.confirmToken, _auth.default.confirmCaterer, _meal.default.update);
router.delete('/meals/:id', _auth.default.confirmToken, _auth.default.confirmCaterer, _meal.default.delete); //  MENU ROUTES

router.get('/menu', _auth.default.confirmToken, _menu.default.getMenu);
router.post('/menu', _auth.default.confirmToken, _menu.default.addMeal);
router.put('/menu', _auth.default.confirmToken, _menu.default.editMeal);
router.delete('/menu/:id', _auth.default.confirmToken, _menu.default.deleteMeal); //  ORDER ITEM ROUTES

router.get('/order-items/:userid', _auth.default.confirmToken, _orderItem.default.getOrderItems);
router.post('/order-items', _auth.default.confirmToken, _orderItem.default.add);
router.put('/order-items', _auth.default.confirmToken, _orderItem.default.edit);
router.delete('/order-items/:id', _auth.default.confirmToken, _orderItem.default.delete); //  ORDER ROUTES

router.get('/orders', _auth.default.confirmToken, _order.default.getOrders);
router.get('/orders/:userid', _auth.default.confirmToken, _order.default.getUserOrders);
router.post('/orders', _auth.default.confirmToken, _order.default.add);
router.put('/orders/:id/:state', _auth.default.confirmToken, _order.default.editState);
router.delete('/orders/:id', _auth.default.confirmToken, _order.default.delete); // USER ROUTES

router.post('/users/login', _user.default.login);
router.post('/users/signup', _user.default.signup); //  CATERER ROUTES

router.post('/caterers/login', _caterer.default.login);
router.post('/caterers/signup', _caterer.default.signup);
var _default = router;
exports.default = _default;
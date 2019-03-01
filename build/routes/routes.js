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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var router = _express.default.Router();

router.use(_express.default.json()); //  MEAL ROUTES

router.get('/meals', function (req, res) {
  var meal = _meal.default.fetchMeals();

  res.json(meal);
});
router.post('/meals', function (req, res) {
  var meal = new _meal.default(_objectSpread({}, req.body));
  res.json(meal.add());
});
router.put('/meals/:id', function (req, res) {
  var meal = new _meal.default(_objectSpread({}, req.body));
  res.json(meal.update(parseInt(req.params.id, 10)));
});
router.delete('/meals/:id', function (req, res) {
  try {
    _meal.default.delete(parseInt(req.params.id, 10));

    res.status(204).json();
  } catch (err) {
    res.json({
      err: err.message
    });
  }
}); //  MENU ROUTES

router.get('/menu', function (req, res) {
  res.json(_menu.default.getMenu());
});
router.post('/menu', function (req, res) {
  res.json(_menu.default.addMeal(req.body));
});
router.put('/menu', function (req, res) {
  res.json(_menu.default.editMeal(req.body));
});
router.delete('/menu/:id', function (req, res) {
  _menu.default.deleteMeal(parseInt(req.params.id, 10));

  res.status(204).send();
}); //  ORDER ITEM ROUTES

router.get('/order-items/:userid', function (req, res) {
  res.json(_orderItem.default.getOrderItems(parseInt(req.params.userid, 10)));
});
router.post('/order-items', function (req, res) {
  var orderItem = new _orderItem.default(req.body);
  res.json(orderItem.add());
});
router.put('/order-items', function (req, res) {
  res.json(_orderItem.default.edit(req.body));
});
router.delete('/order-items/:id', function (req, res) {
  _orderItem.default.delete(parseInt(req.params.id, 10));

  res.status(204).send();
}); //  ORDER ROUTES

router.get('/orders', function (req, res) {
  res.json(_order.default.getOrders());
});
router.get('/orders/:userid', function (req, res) {
  res.json(_order.default.getUserOrders(parseInt(req.params.userid, 10)));
});
router.post('/orders', function (req, res) {
  var order = new _order.default(req.body);
  res.json(order.add());
});
router.put('/orders/:id/:state', function (req, res) {
  _order.default.editState(parseInt(req.params.id, 10), req.params.state);

  res.status(200).send();
});
router.delete('/orders/:id', function (req, res) {
  _order.default.delete(parseInt(req.params.id, 10));

  res.status(200).send();
});
var _default = router;
exports.default = _default;
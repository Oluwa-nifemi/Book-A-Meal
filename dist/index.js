"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _meal = _interopRequireDefault(require("./models/meal"));

var _menu = _interopRequireDefault(require("./models/menu"));

var _orderItem = _interopRequireDefault(require("./models/order-item"));

var _order = _interopRequireDefault(require("./models/order"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var app = (0, _express.default)();
app.use(_express.default.json());
var PORT = process.env.PORT || 3000; //  MEAL ROUTES

app.get('/api/v1/meals', function (req, res) {
  var meal = _meal.default.fetchMeals();

  res.json(meal);
});
app.post('/api/v1/meals', function (req, res) {
  var meal = new _meal.default(_objectSpread({}, req.body));
  res.json(meal.add());
});
app.put('/api/v1/meals/:id', function (req, res) {
  var meal = new _meal.default(_objectSpread({}, req.body));
  res.json(meal.update(parseInt(req.params.id, 10)));
});
app.delete('/api/v1/meals/:id', function (req, res) {
  try {
    _meal.default.delete(parseInt(req.params.id, 10));

    res.status(204).json();
  } catch (err) {
    res.json({
      err: err.message
    });
  }
}); //  MENU ROUTES

app.get('/api/v1/menu', function (req, res) {
  res.json(_menu.default.getMenu());
});
app.post('/api/v1/menu', function (req, res) {
  res.json(_menu.default.addMeal(req.body));
});
app.put('/api/v1/menu', function (req, res) {
  res.json(_menu.default.editMeal(req.body));
});
app.delete('/api/v1/menu/:id', function (req, res) {
  _menu.default.deleteMeal(parseInt(req.params.id, 10));

  res.status(204).send();
}); //  ORDER ITEM ROUTES

app.get('/api/v1/order-items/:userid', function (req, res) {
  res.json(_orderItem.default.getOrderItems(parseInt(req.params.userid, 10)));
});
app.post('/api/v1/order-items', function (req, res) {
  var orderItem = new _orderItem.default(req.body);
  res.json(orderItem.add());
});
app.put('/api/v1/order-items', function (req, res) {
  res.json(_orderItem.default.edit(req.body));
});
app.delete('/api/v1/order-items/:id', function (req, res) {
  _orderItem.default.delete(parseInt(req.params.id, 10));

  res.status(204).send();
}); //  ORDER ROUTES

app.get('/api/v1/orders', function (req, res) {
  res.json(_order.default.getOrders());
});
app.get('/api/v1/orders/:userid', function (req, res) {
  res.json(_order.default.getUserOrders(parseInt(req.params.userid, 10)));
});
app.post('/api/v1/orders', function (req, res) {
  var order = new _order.default(req.body);
  res.json(order.add());
});
app.put('/api/v1/orders/:id/:state', function (req, res) {
  _order.default.editState(parseInt(req.params.id, 10), req.params.state);

  res.status(200).send();
});
app.delete('/api/v1/orders/:id', function (req, res) {
  _order.default.delete(parseInt(req.params.id, 10));

  res.status(200).send();
});
app.listen(PORT);
var _default = app;
exports.default = _default;
//# sourceMappingURL=index.js.map
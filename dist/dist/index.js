"use strict";

var _express = _interopRequireDefault(require("express"));

var _meal = _interopRequireDefault(require("./models/meal"));

var _menu = _interopRequireDefault(require("./models/menu"));

var _orderItem = _interopRequireDefault(require("./models/order-item"));

var _order = _interopRequireDefault(require("./models/order"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var app = (0, _express.default)();
app.use(_express.default.json());
var PORT = process.env.PORT || 3000; //  MEAL ROUTES

app.get('/api/v1/meals', function (req, res) {
  var meal = _meal.default.fetchMeals();

  res.send(meal);
});
app.post('/api/v1/meals', function (req, res) {
  var meal = new _meal.default(_objectSpread({}, req.body));
  res.send(meal.add());
});
app.put('/api/v1/meals/:id', function (req, res) {
  var meal = new _meal.default(_objectSpread({}, req.body));
  res.send(meal.update(parseInt(req.params.id, 10)));
});
app.delete('/api/v1/meals/:id', function (req, res) {
  try {
    _meal.default.delete(parseInt(req.params.id, 10));

    res.status(204).send();
  } catch (err) {
    res.send({
      err: err.message
    });
  }
}); //  MENU ROUTES

app.get('/api/v1/menu', function (req, res) {
  res.send(_menu.default.getMenu());
});
app.post('/api/v1/menu', function (req, res) {
  res.send(_menu.default.addMeal(req.body));
});
app.put('/api/v1/menu', function (req, res) {
  res.send(_menu.default.editMeal(req.body));
}); //  ORDER ITEM ROUTES

app.get('/api/v1/order-items/:userid', function (req, res) {
  res.send(_orderItem.default.getOrderItems(parseInt(req.params.userid, 10)));
});
app.post('/api/v1/order-items', function (req, res) {
  var orderItem = new _orderItem.default(req.body);
  res.send(orderItem.add());
});
app.put('/api/v1/order-items', function (req, res) {
  res.send(_orderItem.default.edit(req.body));
}); //  ORDER ROUTES

app.get('/api/v1/orders', function (req, res) {
  res.send(_order.default.getOrders());
});
app.post('/api/v1/orders', function (req, res) {
  var order = new _order.default(req.body);
  res.send(order.add());
});
app.listen(PORT);
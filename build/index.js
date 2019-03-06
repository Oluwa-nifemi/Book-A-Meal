"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _database = _interopRequireDefault(require("./config/database"));

var _routes = _interopRequireDefault(require("./routes/routes"));

var _Meal = _interopRequireDefault(require("./models/Meal"));

var _Menu = _interopRequireDefault(require("./models/Menu"));

var _OrderItem = _interopRequireDefault(require("./models/OrderItem"));

var _Order = _interopRequireDefault(require("./models/Order"));

var _User = _interopRequireDefault(require("./models/User"));

var _Caterer = _interopRequireDefault(require("./models/Caterer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)(); // Associations

_Order.default.belongsTo(_User.default);

_User.default.hasMany(_Order.default);

_OrderItem.default.belongsTo(_Order.default);

_Order.default.hasMany(_OrderItem.default);

_OrderItem.default.belongsTo(_User.default);

_User.default.hasMany(_OrderItem.default);

_Meal.default.belongsToMany(_OrderItem.default, {
  through: 'ItemMeal'
});

_OrderItem.default.belongsToMany(_Meal.default, {
  through: 'ItemMeal'
});

var PORT = process.env.PORT || 3000;
app.use('/api/v1', _routes.default);

_database.default.sync().then(function () {
  console.log('Connection established');
  app.emit('connected');
  app.listen(PORT);
}).catch(console.log);

var _default = app;
exports.default = _default;
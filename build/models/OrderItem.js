"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = _interopRequireDefault(require("../config/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OrderItem = _database.default.define('OrderItem', {
  id: {
    type: _sequelize.default.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  quantity: {
    type: _sequelize.default.INTEGER
  },
  status: {
    type: _sequelize.default.STRING,
    defaultValue: 'cart'
  }
});

var _default = OrderItem;
exports.default = _default;
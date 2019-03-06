"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = _interopRequireDefault(require("../config/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Order = _database.default.define('Order', {
  id: {
    type: _sequelize.default.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  state: {
    type: _sequelize.default.STRING,
    defaultValue: 'pending'
  },
  date: {
    type: _sequelize.default.DATEONLY,
    defaultValue: _sequelize.default.NOW
  },
  address: {
    type: _sequelize.default.STRING
  }
});

var _default = Order;
exports.default = _default;
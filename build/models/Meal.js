"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = _interopRequireDefault(require("../config/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Meal = _database.default.define('Meal', {
  id: {
    type: _sequelize.default.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: _sequelize.default.STRING
  },
  description: {
    type: _sequelize.default.STRING
  },
  image: {
    type: _sequelize.default.STRING
  },
  price: {
    type: _sequelize.default.FLOAT
  },
  defaultQuantity: {
    type: _sequelize.default.INTEGER
  }
});

var _default = Meal;
exports.default = _default;
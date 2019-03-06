"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = _interopRequireDefault(require("../config/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Menu = _database.default.define('Menu', {
  date: {
    type: _sequelize.default.DATEONLY,
    defaultValue: _sequelize.default.NOW
  },
  meals: {
    type: _sequelize.default.ARRAY(_sequelize.default.JSON),
    defaultValue: []
  }
});

var _default = Menu;
exports.default = _default;
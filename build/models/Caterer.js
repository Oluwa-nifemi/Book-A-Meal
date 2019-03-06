"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sequelize = _interopRequireDefault(require("sequelize"));

var _database = _interopRequireDefault(require("../config/database"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Caterer = _database.default.define('Caterer', {
  name: {
    type: _sequelize.default.STRING
  },
  email: {
    type: _sequelize.default.STRING,
    unique: true
  },
  password: {
    type: _sequelize.default.STRING
  }
});

var _default = Caterer;
exports.default = _default;
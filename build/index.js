"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _database = _interopRequireDefault(require("./config/database"));

var _routes = _interopRequireDefault(require("./routes/routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express.default)();

_database.default.authenticate().then(function () {
  console.log('Connected');
}).catch(console.log);

var PORT = process.env.PORT || 3000;
app.use('/api/v1', _routes.default);
app.listen(PORT);
var _default = app;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var p = _path.default.join(_path.default.dirname(process.mainModule.filename), 'data', 'orders.json');

var Order =
/*#__PURE__*/
function () {
  function Order(_ref) {
    var userId = _ref.userId,
        date = _ref.date,
        orderItems = _ref.orderItems,
        state = _ref.state;

    _classCallCheck(this, Order);

    Object.assign(this, {
      userId: userId,
      date: date,
      orderItems: orderItems,
      state: state
    });
  }

  _createClass(Order, [{
    key: "add",
    value: function add() {
      var orders = JSON.parse(this.constructor.getOrders());
      orders.push(this);

      _fs.default.writeFileSync(p, JSON.stringify(orders));

      return this;
    }
  }], [{
    key: "getOrders",
    value: function getOrders() {
      return _fs.default.readFileSync(p);
    }
  }]);

  return Order;
}();

var _default = Order;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _meal = _interopRequireDefault(require("./meal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var p = _path.default.join(__dirname, '../data', 'orders.json');

var pItems = _path.default.join(__dirname, '../data', 'order-items.json');

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
      var orders = this.constructor.getOrders(false);
      var id = orders.length + 1;
      orders.push(_objectSpread({
        id: id
      }, this));

      _fs.default.writeFileSync(p, JSON.stringify(orders));

      return _objectSpread({
        id: id
      }, this);
    }
  }], [{
    key: "getOrders",
    value: function getOrders() {
      var details = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var orders = JSON.parse(_fs.default.readFileSync(p, 'utf-8'));

      if (details) {
        var orderItems = JSON.parse(_fs.default.readFileSync(pItems, 'utf-8'));
        orders = orders.map(function (order) {
          var orderMapped = order;
          orderMapped.orderItems = orderMapped.orderItems.map(function (item) {
            return orderItems.find(function (i) {
              return i.id === item;
            });
          }).map(function (item) {
            return _objectSpread({}, _meal.default.fetchMealById(item.mealId), item);
          });
          return orderMapped;
        });
      }

      return orders;
    }
  }, {
    key: "getUserOrders",
    value: function getUserOrders(userId) {
      var orders = this.getOrders(true);
      orders = orders.filter(function (order) {
        return order.userId === userId;
      });
      return orders;
    }
  }, {
    key: "editState",
    value: function editState(id, state) {
      var orders = this.getOrders(false);
      var order = orders.find(function (e) {
        return e.id === id;
      });

      if (order) {
        order.state = state;

        _fs.default.writeFileSync(p, JSON.stringify(orders));
      }
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      var orders = this.getOrders(false);
      orders = orders.filter(function (order) {
        return order.id !== id || order.state !== 'pending';
      });

      _fs.default.writeFileSync(p, JSON.stringify(orders));
    }
  }]);

  return Order;
}();

var _default = Order;
exports.default = _default;
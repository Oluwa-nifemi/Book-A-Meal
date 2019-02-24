"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var p = _path.default.join(__dirname, '../data', 'order-items.json');

var OrderItem =
/*#__PURE__*/
function () {
  function OrderItem(_ref) {
    var mealId = _ref.mealId,
        userId = _ref.userId,
        quantity = _ref.quantity,
        status = _ref.status;

    _classCallCheck(this, OrderItem);

    Object.assign(this, {
      mealId: mealId,
      userId: userId,
      quantity: quantity,
      status: status
    });
  }

  _createClass(OrderItem, [{
    key: "add",
    value: function add() {
      var _this = this;

      var orderItems = JSON.parse(_fs.default.readFileSync(p));

      if (orderItems.find(function (item) {
        return item.mealId === _this.mealId && item.userId === _this.userId;
      })) {
        return {
          err: 'Meal already exists you can increase the quantity in your cart'
        };
      }

      var id = orderItems.length + 1;
      orderItems.push(_objectSpread({
        id: id
      }, this));

      _fs.default.writeFileSync(p, JSON.stringify(orderItems));

      return _objectSpread({
        id: id
      }, this);
    }
  }], [{
    key: "getOrderItems",
    value: function getOrderItems(id) {
      var orderItems = JSON.parse(_fs.default.readFileSync(p));
      var orderItemsFiltered = orderItems.filter(function (item) {
        return item.userId === id && item.status === 'cart';
      });
      return orderItemsFiltered;
    }
  }, {
    key: "edit",
    value: function edit(item) {
      var orderItems = JSON.parse(_fs.default.readFileSync(p));
      var index = orderItems.findIndex(function (elem) {
        return elem.id === item.id;
      });

      if (index !== -1) {
        orderItems[index] = item;

        _fs.default.writeFileSync(p, JSON.stringify(orderItems));

        return item;
      }

      return {
        err: "Meal doesn't exist database"
      };
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      var orderItems = JSON.parse(_fs.default.readFileSync(p));
      orderItems = orderItems.filter(function (item) {
        return item.id !== id;
      });

      _fs.default.writeFileSync(p, JSON.stringify(orderItems));
    }
  }]);

  return OrderItem;
}();

var _default = OrderItem;
exports.default = _default;
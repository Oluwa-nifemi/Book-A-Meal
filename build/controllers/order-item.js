"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _OrderItem = _interopRequireDefault(require("../models/OrderItem"));

var _Meal = _interopRequireDefault(require("../models/Meal"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OrderItem =
/*#__PURE__*/
function () {
  function OrderItem() {
    _classCallCheck(this, OrderItem);
  }

  _createClass(OrderItem, null, [{
    key: "getOrderItems",
    value: function () {
      var _getOrderItems = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var id, orders;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                id = parseInt(req.params.userid, 10);
                _context.next = 3;
                return _OrderItem.default.findAll({
                  where: {
                    UserId: id,
                    status: 'cart'
                  },
                  include: [_Meal.default]
                });

              case 3:
                orders = _context.sent;
                orders = orders.map(function (order) {
                  return order.dataValues;
                });
                res.status(200).json({
                  status: 'success',
                  data: orders
                });
                return _context.abrupt("return", true);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getOrderItems(_x, _x2) {
        return _getOrderItems.apply(this, arguments);
      }

      return getOrderItems;
    }()
  }, {
    key: "checkifExists",
    value: function () {
      var _checkifExists = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res, next) {
        var item, prevItem;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                item = req.body;
                _context2.next = 3;
                return _OrderItem.default.findOne({
                  where: {
                    status: 'cart'
                  },
                  include: [{
                    model: _Meal.default,
                    where: {
                      id: item.mealId
                    }
                  }, {
                    model: _User.default,
                    where: {
                      id: item.userId
                    }
                  }]
                });

              case 3:
                prevItem = _context2.sent;

                if (!prevItem) {
                  _context2.next = 7;
                  break;
                }

                res.status(409).json({
                  status: 'failure',
                  message: 'The item is already on your cart'
                });
                return _context2.abrupt("return", false);

              case 7:
                next();
                return _context2.abrupt("return", true);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function checkifExists(_x3, _x4, _x5) {
        return _checkifExists.apply(this, arguments);
      }

      return checkifExists;
    }()
  }, {
    key: "add",
    value: function () {
      var _add = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var item, meal, i, user;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                item = req.body;
                _context3.next = 3;
                return _Meal.default.findOne({
                  where: {
                    id: item.mealId
                  }
                });

              case 3:
                meal = _context3.sent;

                if (!meal) {
                  _context3.next = 18;
                  break;
                }

                _context3.next = 7;
                return _OrderItem.default.create({
                  quantity: item.quantity
                });

              case 7:
                i = _context3.sent;
                _context3.next = 10;
                return _User.default.findOne({
                  where: {
                    id: item.userId
                  }
                });

              case 10:
                user = _context3.sent;

                if (user) {
                  _context3.next = 14;
                  break;
                }

                res.status(404).json({
                  status: 'failure',
                  message: 'User does not exist'
                });
                return _context3.abrupt("return", false);

              case 14:
                i.addMeal(meal);
                i.setUser(user);
                res.status(200).json({
                  data: _objectSpread({}, i.dataValues, {
                    meal: meal
                  }),
                  status: 'success'
                });
                return _context3.abrupt("return", true);

              case 18:
                res.status(404).json({
                  status: 'failure',
                  message: 'The meal does not exist'
                });
                return _context3.abrupt("return", false);

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function add(_x6, _x7) {
        return _add.apply(this, arguments);
      }

      return add;
    }()
  }, {
    key: "edit",
    value: function () {
      var _edit = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var item, response, orderItem;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                item = req.body;
                _context4.next = 3;
                return _OrderItem.default.update({
                  quantity: item.quantity
                }, {
                  where: {
                    id: item.id,
                    UserId: item.userId
                  },
                  returning: true
                });

              case 3:
                response = _context4.sent;

                if (!response[0]) {
                  _context4.next = 8;
                  break;
                }

                orderItem = response[1][0];
                res.status(200).json({
                  status: 'success',
                  data: orderItem
                });
                return _context4.abrupt("return", true);

              case 8:
                res.status(404).json({
                  status: 'failure',
                  message: 'The item is not on your cart'
                });
                return _context4.abrupt("return", false);

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function edit(_x8, _x9) {
        return _edit.apply(this, arguments);
      }

      return edit;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(req, res) {
        var id;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = parseInt(req.params.id, 10);
                _context5.next = 3;
                return _OrderItem.default.destroy({
                  where: {
                    id: id,
                    status: 'cart',
                    UserId: req.params.tokenId
                  }
                });

              case 3:
                res.status(204).send();

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function _delete(_x10, _x11) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);

  return OrderItem;
}();

var _default = OrderItem;
exports.default = _default;
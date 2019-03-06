"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _sequelize = _interopRequireDefault(require("sequelize"));

var _Order = _interopRequireDefault(require("../models/Order"));

var _User = _interopRequireDefault(require("../models/User"));

var _OrderItem = _interopRequireDefault(require("../models/OrderItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Op = _sequelize.default.Op;

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

  _createClass(Order, null, [{
    key: "getOrders",
    value: function () {
      var _getOrders = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var orders;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Order.default.findAll({
                  include: [_OrderItem.default]
                });

              case 2:
                orders = _context.sent;
                orders = orders.map(function (order) {
                  return order.dataValues;
                });
                res.status(200).json({
                  status: 'success',
                  data: orders
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getOrders(_x, _x2) {
        return _getOrders.apply(this, arguments);
      }

      return getOrders;
    }()
  }, {
    key: "add",
    value: function () {
      var _add = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var order, user, createdOrder, orderItems;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                order = req.body;
                _context2.next = 3;
                return _User.default.findByPk(order.userId);

              case 3:
                user = _context2.sent;

                if (!user) {
                  _context2.next = 17;
                  break;
                }

                _context2.next = 7;
                return _Order.default.create({
                  address: user.address
                });

              case 7:
                createdOrder = _context2.sent;
                _context2.next = 10;
                return _OrderItem.default.findAll({
                  where: {
                    id: order.orderItems,
                    UserId: order.userId
                  }
                });

              case 10:
                orderItems = _context2.sent;
                createdOrder.addOrderItems(orderItems);
                createdOrder.setUser(user);
                _context2.next = 15;
                return _OrderItem.default.update({
                  status: 'checked_out'
                }, {
                  where: {
                    id: _defineProperty({}, Op.or, order.orderItems),
                    UserId: order.userId
                  }
                });

              case 15:
                res.status(200).send({
                  status: 'success',
                  messsage: 'The order was succesfully added',
                  data: createdOrder.dataValues
                });
                return _context2.abrupt("return");

              case 17:
                res.status(404).json({
                  status: 'failure',
                  messsage: 'The user was not found. Are you sure you are logged in to a valid account'
                });

              case 18:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function add(_x3, _x4) {
        return _add.apply(this, arguments);
      }

      return add;
    }()
  }, {
    key: "getUserOrders",
    value: function () {
      var _getUserOrders = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var UserId, orders;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                UserId = parseInt(req.params.userid, 10);

                if (!(UserId !== req.params.tokenId)) {
                  _context3.next = 4;
                  break;
                }

                res.status(403).json({
                  status: 'failure',
                  message: 'You are not allowed to access that'
                });
                return _context3.abrupt("return");

              case 4:
                _context3.next = 6;
                return _Order.default.findAll({
                  where: {
                    UserId: UserId
                  },
                  include: [_OrderItem.default]
                });

              case 6:
                orders = _context3.sent;
                orders = orders.map(function (order) {
                  return order.dataValues;
                });
                res.status(200).json({
                  status: 'success',
                  data: orders
                });

              case 9:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getUserOrders(_x5, _x6) {
        return _getUserOrders.apply(this, arguments);
      }

      return getUserOrders;
    }()
  }, {
    key: "editState",
    value: function () {
      var _editState = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var _req$params, id, state, response;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _req$params = req.params, id = _req$params.id, state = _req$params.state;
                _context4.next = 3;
                return _Order.default.update({
                  state: state
                }, {
                  where: {
                    id: id
                  },
                  returning: true
                });

              case 3:
                response = _context4.sent;

                if (!response[0]) {
                  _context4.next = 7;
                  break;
                }

                res.status(200).json({
                  status: 'success',
                  message: 'The order has been edited'
                });
                return _context4.abrupt("return", true);

              case 7:
                res.status(404).json({
                  status: 'failure',
                  message: 'The order was not found'
                });
                return _context4.abrupt("return", false);

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function editState(_x7, _x8) {
        return _editState.apply(this, arguments);
      }

      return editState;
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
                id = req.params.id;
                _context5.prev = 1;
                _context5.next = 4;
                return _Order.default.destroy({
                  where: {
                    id: id,
                    UserId: req.params.tokenId
                  }
                });

              case 4:
                res.status(204).send();
                _context5.next = 10;
                break;

              case 7:
                _context5.prev = 7;
                _context5.t0 = _context5["catch"](1);
                res.status(500).json({
                  status: 'failure',
                  message: 'Something went wrong, please try again'
                });

              case 10:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 7]]);
      }));

      function _delete(_x9, _x10) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);

  return Order;
}();

var _default = Order;
exports.default = _default;
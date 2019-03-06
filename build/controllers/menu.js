"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Menu = _interopRequireDefault(require("../models/Menu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Menu =
/*#__PURE__*/
function () {
  function Menu(_ref) {
    var userId = _ref.userId,
        date = _ref.date,
        orderItems = _ref.orderItems,
        state = _ref.state;

    _classCallCheck(this, Menu);

    Object.assign(this, {
      userId: userId,
      date: date,
      orderItems: orderItems,
      state: state
    });
  }

  _createClass(Menu, null, [{
    key: "getMenu",
    value: function () {
      var _getMenu = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var menu;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Menu.default.findOne({
                  where: {
                    date: new Date()
                  }
                });

              case 2:
                menu = _context.sent;

                if (menu) {
                  _context.next = 7;
                  break;
                }

                _context.next = 6;
                return _Menu.default.create();

              case 6:
                menu = _context.sent;

              case 7:
                res.status(200).send(menu.dataValues);

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getMenu(_x, _x2) {
        return _getMenu.apply(this, arguments);
      }

      return getMenu;
    }()
  }, {
    key: "addMeal",
    value: function () {
      var _addMeal = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var menu, meals, meal;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Menu.default.findOne({
                  where: {
                    date: new Date()
                  }
                });

              case 2:
                menu = _context2.sent;
                meals = menu.meals;
                meal = req.body;

                if (meals.find(function (m) {
                  return m.id === meal.id;
                })) {
                  _context2.next = 10;
                  break;
                }

                meals.push(meal);
                _context2.next = 9;
                return _Menu.default.update({
                  meals: meals
                }, {
                  where: {
                    date: new Date()
                  }
                });

              case 9:
                res.send('The meal was added to the database');

              case 10:
                res.status(409).send('Meal already in menu');

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function addMeal(_x3, _x4) {
        return _addMeal.apply(this, arguments);
      }

      return addMeal;
    }()
  }, {
    key: "editMeal",
    value: function () {
      var _editMeal = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var meal, menu, meals, mealIndex;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                meal = req.body;
                _context3.next = 3;
                return _Menu.default.findOne({
                  where: {
                    date: new Date()
                  }
                });

              case 3:
                menu = _context3.sent;
                meals = menu.meals;
                mealIndex = meals.findIndex(function (m) {
                  return m.id === meal.id;
                });

                if (!(mealIndex > -1)) {
                  _context3.next = 11;
                  break;
                }

                meals.splice(mealIndex, 1, meal);
                _context3.next = 10;
                return _Menu.default.update({
                  meals: meals
                }, {
                  where: {
                    date: new Date()
                  }
                });

              case 10:
                res.status(200).send('The meal was succesfully edited');

              case 11:
                res.status(409).send('Meal is not on the menu');

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function editMeal(_x5, _x6) {
        return _editMeal.apply(this, arguments);
      }

      return editMeal;
    }()
  }, {
    key: "deleteMeal",
    value: function () {
      var _deleteMeal = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var menu, id, meals, mealIndex;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _Menu.default.findOne({
                  where: {
                    date: new Date()
                  }
                });

              case 2:
                menu = _context4.sent;
                id = parseInt(req.params.id, 10);
                meals = menu.meals;
                mealIndex = meals.findIndex(function (m) {
                  return m.id === id;
                });

                if (!(mealIndex > -1)) {
                  _context4.next = 11;
                  break;
                }

                meals.splice(mealIndex, 1);

                _Menu.default.update({
                  meals: meals
                }, {
                  where: {
                    date: new Date()
                  }
                });

                res.status(204).send();
                return _context4.abrupt("return");

              case 11:
                res.status(409);

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function deleteMeal(_x7, _x8) {
        return _deleteMeal.apply(this, arguments);
      }

      return deleteMeal;
    }()
  }]);

  return Menu;
}();

var _default = Menu;
exports.default = _default;
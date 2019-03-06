"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Meal = _interopRequireDefault(require("../models/Meal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Meal =
/*#__PURE__*/
function () {
  function Meal() {
    _classCallCheck(this, Meal);
  }

  _createClass(Meal, null, [{
    key: "fetchMeals",
    value: function () {
      var _fetchMeals = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var meals, mealsDetails;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Meal.default.findAll();

              case 2:
                meals = _context.sent;
                mealsDetails = meals.map(function (meal) {
                  return meal.dataValues;
                });
                res.status(200).json({
                  status: 'success',
                  data: mealsDetails
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetchMeals(_x, _x2) {
        return _fetchMeals.apply(this, arguments);
      }

      return fetchMeals;
    }()
  }, {
    key: "add",
    value: function () {
      var _add = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var meal, mealDetails;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _Meal.default.create(req.body);

              case 2:
                meal = _context2.sent;
                mealDetails = meal.dataValues;
                res.status(200).json({
                  status: 'success',
                  data: mealDetails
                });

              case 5:
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
    key: "update",
    value: function () {
      var _update = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(req, res) {
        var updated, updatedMeal;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _Meal.default.update(req.body, {
                  where: {
                    id: req.params.id
                  },
                  returning: true
                });

              case 2:
                updated = _context3.sent;
                updatedMeal = updated[1][0];
                res.status(200).json({
                  status: 'success',
                  data: updatedMeal
                });

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function update(_x5, _x6) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(req, res) {
        var id;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                id = parseInt(req.params.id, 10);
                _context4.prev = 1;
                _context4.next = 4;
                return _Meal.default.destroy({
                  where: {
                    id: id
                  }
                });

              case 4:
                res.status(204).send();
                _context4.next = 10;
                break;

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](1);
                res.json({
                  err: _context4.t0.message
                });

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[1, 7]]);
      }));

      function _delete(_x7, _x8) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);

  return Meal;
}();

var _default = Meal;
exports.default = _default;
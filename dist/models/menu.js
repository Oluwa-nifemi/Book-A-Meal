"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var p = _path.default.join(_path.default.dirname(process.mainModule.filename), 'data', 'menu.json');

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
    value: function getMenu() {
      try {
        var data = JSON.parse(_fs.default.readFileSync(p));
        var today = new Date();
        var todayFormatted = "".concat(today.getDate(), "-").concat(today.getMonth() + 1, "-").concat(today.getFullYear());
        var menuToday = data.find(function (menu) {
          return "".concat(menu.date) === todayFormatted;
        }) || {};

        if (!Object.keys(menuToday).length) {
          menuToday.date = todayFormatted;
          menuToday.meals = [];
          data.push(menuToday);

          _fs.default.writeFileSync(p, JSON.stringify(data));
        }

        return menuToday;
      } catch (err) {
        return {
          err: err.message
        };
      }
    }
  }, {
    key: "addMeal",
    value: function addMeal(meal) {
      var menu = this.getMenu();
      var meals = JSON.parse(_fs.default.readFileSync(p));
      var index = meals.findIndex(function (m) {
        return m.date === menu.date;
      });

      if (!menu.meals.find(function (m) {
        return m.id === meal.id;
      })) {
        menu.meals.push(meal);
        meals[index] = menu;

        _fs.default.writeFileSync(p, JSON.stringify(meals));

        return meal;
      }

      return {
        err: 'Meal already in menu'
      };
    }
  }, {
    key: "editMeal",
    value: function editMeal(meal) {
      var menu = this.getMenu();
      var meals = JSON.parse(_fs.default.readFileSync(p));
      var index = meals.findIndex(function (m) {
        return m.date === menu.date;
      });
      var mealIndex = menu.meals.findIndex(function (m) {
        return m.id === meal.id;
      });

      if (mealIndex !== -1) {
        menu.meals[mealIndex] = meal;
        meals[index] = menu;

        _fs.default.writeFileSync(p, JSON.stringify(meals));

        return meal;
      }

      return {
        err: "Meal doesn't exist in menu"
      };
    }
  }, {
    key: "deleteMeal",
    value: function deleteMeal(id) {
      var menu = this.getMenu();
      var meals = JSON.parse(_fs.default.readFileSync(p));
      var index = meals.findIndex(function (m) {
        return m.date === menu.date;
      });
      menu.meals = menu.meals.filter(function (meal) {
        return meal.id !== id;
      });
      meals[index] = menu;
      return meals;
    }
  }]);

  return Menu;
}();

var _default = Menu;
exports.default = _default;
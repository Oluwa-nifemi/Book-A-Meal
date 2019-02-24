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

var p = _path.default.join(__dirname, '../data', 'menu.json');

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

        if (menuToday.meals) {
          menuToday.meals = menuToday.meals.map(function (meal) {
            return _objectSpread({}, meal, _meal.default.fetchMealById(meal.id));
          });
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
      var menus = JSON.parse(_fs.default.readFileSync(p));
      var index = menus.findIndex(function (m) {
        return m.date === menu.date;
      });

      if (!menu.meals.find(function (m) {
        return m.id === meal.id;
      })) {
        menu.meals.push(meal);
        menus[index] = menu;

        _fs.default.writeFileSync(p, JSON.stringify(menus));

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
      var menus = JSON.parse(_fs.default.readFileSync(_path.default.join(__dirname, '../data', 'menu.json')));
      var index = menus.findIndex(function (m) {
        return m.date === menu.date;
      });
      var mealIndex = menu.meals.findIndex(function (m) {
        return m.id === meal.id;
      });

      if (mealIndex !== -1) {
        menu.meals[mealIndex] = meal;
        menus[index] = menu;

        _fs.default.writeFileSync(p, JSON.stringify(menus));

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
      var menus = JSON.parse(_fs.default.readFileSync(p));
      var index = menus.findIndex(function (m) {
        return m.date === menu.date;
      });
      menu.meals = menu.meals.filter(function (meal) {
        return meal.id !== id;
      });
      menus[index] = menu;

      _fs.default.writeFileSync(p, JSON.stringify(menus));
    }
  }]);

  return Menu;
}();

var _default = Menu;
exports.default = _default;
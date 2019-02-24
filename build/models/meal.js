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

var p = _path.default.join(__dirname, '../data', 'meals.json');

var Meal =
/*#__PURE__*/
function () {
  function Meal(_ref) {
    var title = _ref.title,
        description = _ref.description,
        image = _ref.image,
        price = _ref.price,
        defaultQuantity = _ref.defaultQuantity;

    _classCallCheck(this, Meal);

    Object.assign(this, {
      title: title,
      description: description,
      image: image,
      price: price,
      defaultQuantity: defaultQuantity
    });
  }

  _createClass(Meal, [{
    key: "add",
    value: function add() {
      try {
        var meals = JSON.parse(this.constructor.fetchMeals());

        var meal = _objectSpread({
          id: meals.length + 1
        }, this);

        meals.push(meal);

        _fs.default.writeFileSync(p, JSON.stringify(meals));

        return meal;
      } catch (err) {
        return err;
      }
    }
  }, {
    key: "update",
    value: function update(id) {
      try {
        var meals = JSON.parse(this.constructor.fetchMeals());

        var meal = _objectSpread({
          id: id
        }, this);

        var index = meals.findIndex(function (m) {
          return id === m.id;
        });

        if (index !== -1) {
          meals[index] = meal;

          _fs.default.writeFileSync(p, JSON.stringify(meals));

          return meals[index];
        }

        return {};
      } catch (err) {
        return {
          err: err.message
        };
      }
    }
  }], [{
    key: "fetchMeals",
    value: function fetchMeals() {
      return _fs.default.readFileSync(p, 'utf-8');
    }
  }, {
    key: "delete",
    value: function _delete(id) {
      var meals = JSON.parse(this.fetchMeals());
      meals = meals.filter(function (meal) {
        return meal.id !== id;
      });

      _fs.default.writeFileSync(p, JSON.stringify(meals));
    }
  }]);

  return Meal;
}();

var _default = Meal;
exports.default = _default;
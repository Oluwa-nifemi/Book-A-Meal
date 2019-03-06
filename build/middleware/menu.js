"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var schema = _joi.default.object().keys({
  mealId: _joi.default.number().min(1),
  quantity: _joi.default.number().min(1)
});

var Menu =
/*#__PURE__*/
function () {
  function Menu() {
    _classCallCheck(this, Menu);
  }

  _createClass(Menu, null, [{
    key: "validate",
    value: function validate(req, res, next) {
      var _Joi$validate = _joi.default.validate(req.body, schema),
          error = _Joi$validate.error;

      if (error) {
        var errorMessage = error.details[0].message;
        res.status(409).send({
          status: 'failure',
          message: errorMessage
        });
        return false;
      }

      next();
      return true;
    }
  }]);

  return Menu;
}();

var _default = Menu;
exports.default = _default;
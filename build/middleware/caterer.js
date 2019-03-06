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

var Caterer =
/*#__PURE__*/
function () {
  function Caterer() {
    _classCallCheck(this, Caterer);
  }

  _createClass(Caterer, null, [{
    key: "login",
    value: function login(req, res, next) {
      var schema = _joi.default.object().keys({
        email: _joi.default.string().email().required(),
        password: _joi.default.string().min(8).required(),
        name: _joi.default.string().min(3)
      });

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
  }, {
    key: "signup",
    value: function signup(req, res, next) {
      var schema = _joi.default.object().keys({
        email: _joi.default.string().email().required(),
        password: _joi.default.string().min(8).required(),
        name: _joi.default.string().min(3).required()
      });

      var _Joi$validate2 = _joi.default.validate(req.body, schema),
          error = _Joi$validate2.error;

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

  return Caterer;
}();

var _default = Caterer;
exports.default = _default;
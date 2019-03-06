"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _Caterer = _interopRequireDefault(require("../models/Caterer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv.default.config();

var Caterer =
/*#__PURE__*/
function () {
  function Caterer() {
    _classCallCheck(this, Caterer);
  }

  _createClass(Caterer, null, [{
    key: "login",
    value: function () {
      var _login = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var catererdb, token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _Caterer.default.findOne({
                  where: {
                    email: req.body.email
                  }
                });

              case 2:
                catererdb = _context.sent;

                if (!(catererdb && catererdb.password === req.body.password)) {
                  _context.next = 7;
                  break;
                }

                token = _jsonwebtoken.default.sign({
                  id: catererdb.id,
                  caterer: true
                }, process.env.SECRET_KEY);
                res.header('x-auth-token', token).status(200).json({
                  status: 'success'
                });
                return _context.abrupt("return", true);

              case 7:
                res.status(400).json({
                  status: 'failure',
                  message: 'Invalid email or password'
                });
                return _context.abrupt("return", false);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function login(_x, _x2) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "signup",
    value: function () {
      var _signup = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var caterer, prevUser;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                caterer = req.body;
                _context2.next = 3;
                return _Caterer.default.find({
                  where: {
                    email: caterer.email
                  }
                });

              case 3:
                prevUser = _context2.sent;

                if (!prevUser) {
                  _context2.next = 7;
                  break;
                }

                res.status(409).send({
                  status: 'failure',
                  message: 'There\'s already a caterer with that email'
                });
                return _context2.abrupt("return", false);

              case 7:
                _context2.next = 9;
                return _Caterer.default.create(caterer);

              case 9:
                res.status(200).json({
                  status: 'success'
                });
                return _context2.abrupt("return", true);

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function signup(_x3, _x4) {
        return _signup.apply(this, arguments);
      }

      return signup;
    }()
  }]);

  return Caterer;
}();

var _default = Caterer;
exports.default = _default;
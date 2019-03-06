"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv.default.config();

var User =
/*#__PURE__*/
function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: "login",
    value: function () {
      var _login = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var userdb, token;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _User.default.findOne({
                  where: {
                    email: req.body.email
                  }
                });

              case 2:
                userdb = _context.sent;

                if (!userdb) {
                  _context.next = 6;
                  break;
                }

                if (userdb.password === req.body.password) {
                  token = _jsonwebtoken.default.sign({
                    id: userdb.id
                  }, process.env.SECRET_KEY);
                  res.header('x-auth-token', token).status(200).send({
                    status: 'success'
                  });
                }

                return _context.abrupt("return", res.status(400).send('Invalid email or password'));

              case 6:
                return _context.abrupt("return", res.status(400).send('Invalid email or password'));

              case 7:
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
        var user, createdUser, userDetails;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                user = req.body;
                _context2.next = 4;
                return _User.default.create(user);

              case 4:
                createdUser = _context2.sent;
                userDetails = createdUser.dataValues;
                return _context2.abrupt("return", res.status(200).send(userDetails));

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", res.status(409));

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 9]]);
      }));

      function signup(_x3, _x4) {
        return _signup.apply(this, arguments);
      }

      return signup;
    }()
  }]);

  return User;
}();

var _default = User;
exports.default = _default;
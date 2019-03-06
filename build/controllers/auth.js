"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv.default.config();

var Authenticate =
/*#__PURE__*/
function () {
  function Authenticate() {
    _classCallCheck(this, Authenticate);
  }

  _createClass(Authenticate, null, [{
    key: "confirmToken",
    value: function () {
      var _confirmToken = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res, next) {
        var token, verify;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                token = req.headers.bearer;

                if (token) {
                  _context.next = 4;
                  break;
                }

                res.status(409).json({
                  status: 'failure',
                  message: 'No request token'
                });
                return _context.abrupt("return", false);

              case 4:
                _context.prev = 4;
                _context.next = 7;
                return _jsonwebtoken.default.verify(token, process.env.SECRET_KEY);

              case 7:
                verify = _context.sent;
                req.params.tokenId = verify.id;
                next();
                return _context.abrupt("return", true);

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](4);

                if (!(_context.t0.message === 'invalid signature')) {
                  _context.next = 18;
                  break;
                }

                res.status(403).json({
                  status: 'failure',
                  message: 'Invalid signature'
                });
                return _context.abrupt("return", false);

              case 18:
                res.status(500).json({
                  status: 'failure',
                  message: 'Server error'
                });
                return _context.abrupt("return", false);

              case 20:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 13]]);
      }));

      function confirmToken(_x, _x2, _x3) {
        return _confirmToken.apply(this, arguments);
      }

      return confirmToken;
    }()
  }, {
    key: "confirmCaterer",
    value: function () {
      var _confirmCaterer = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res, next) {
        var token, verify;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                token = req.headers.bearer;
                _context2.prev = 1;
                _context2.next = 4;
                return _jsonwebtoken.default.verify(token, process.env.SECRET_KEY);

              case 4:
                verify = _context2.sent;

                if (verify.caterer) {
                  _context2.next = 8;
                  break;
                }

                res.status(403).send('You\'re not allowed to access that');
                return _context2.abrupt("return", false);

              case 8:
                next();
                return _context2.abrupt("return", true);

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](1);

                if (!(_context2.t0.message === 'invalid signature')) {
                  _context2.next = 17;
                  break;
                }

                res.status(403).send('Invalid signature');
                return _context2.abrupt("return", false);

              case 17:
                res.status(500).send('Server error');
                return _context2.abrupt("return", false);

              case 19:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 12]]);
      }));

      function confirmCaterer(_x4, _x5, _x6) {
        return _confirmCaterer.apply(this, arguments);
      }

      return confirmCaterer;
    }()
  }]);

  return Authenticate;
}();

var _default = Authenticate;
exports.default = _default;
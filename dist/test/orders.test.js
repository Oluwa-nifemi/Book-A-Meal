"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai.default.expect,
    use = _chai.default.use;
use(_chaiHttp.default);
var apiVersion = '/api/v1'; //Get id of item added during add order test to delete during delete order test

var id;
describe('Get orders', function () {
  it('Should return all orders', function () {
    _chai.default.request(_index.default).get("".concat(apiVersion, "/orders")).then(function (res) {
      return JSON.parse(res.body);
    }).then(function (orders) {
      expect(orders).to.be.an('array');
    });
  });
});
describe('Get orders by user id', function () {
  it('Should return all orders belong to that user', function () {
    _chai.default.request(_index.default).get("".concat(apiVersion, "/orders/1")).then(function (res) {
      return res.body;
    }).then(function (orders) {
      expect(orders).to.be.an('array');
      var invalid = orders.filter(function (order) {
        return order.userId !== 1;
      }).length;
      expect(invalid).to.be.equal(0);
    });
  });
});
describe('Add order', function () {
  it('Should return the added order', function () {
    _chai.default.request(_index.default).post("".concat(apiVersion, "/orders")).send({
      "userId": 1,
      "date": "27-12-12",
      "orderItems": [1, 4],
      "state": "pending"
    }).then(function (res) {
      return res.body;
    }).then(function (order) {
      id = order.id;
      expect(order).to.be.an('object');
    });
  });
});
describe('Delete order', function () {
  it('Should return empty response', function () {
    _chai.default.request(_index.default).delete("".concat(apiVersion, "/orders/").concat(id)).then(function (res) {
      expect(res.text).to.be.equal('');
    }).catch(function (err) {
      console.log(err.message);
    });
  });
});
describe('Edit order state', function () {
  it('Should return empty response', function () {
    _chai.default.request(_index.default).put("".concat(apiVersion, "/orders/1/delivered")).then(function (res) {
      expect(res.text).to.be.equal('');
    }).catch(function (err) {
      console.log(err.message);
    });
  });
});
//# sourceMappingURL=orders.test.js.map
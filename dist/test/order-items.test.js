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
var apiVersion = '/api/v1'; //Get id of item added during add order item test to delete during delete order item test

var id;
describe('Get order items', function () {
  _chai.default.request(_index.default).get("".concat(apiVersion, "/order-items/1")).then(function (res) {
    return res.body;
  }).then(function (items) {
    expect(items).to.be.an('array');

    if (items[0]) {
      expect(items[0]).to.have.all.keys('mealId', 'userId', 'id', 'quantity', 'status');
    }
  });
});
describe('Add order item', function () {
  it('Should return added item', function () {
    _chai.default.request(_index.default).post("".concat(apiVersion, "/order-items")).send({
      "mealId": 5,
      "userId": 2,
      "quantity": 2,
      "status": "cart"
    }).then(function (res) {
      return res.body;
    }).then(function (order) {
      id = order.id;
      expect(order).to.be.an('object');
      expect(order).to.have.all.keys('mealId', 'userId', 'id', 'quantity', 'status');
    });
  });
});
describe('Edit order item', function () {
  it('Should return added item', function () {
    _chai.default.request(_index.default).put("".concat(apiVersion, "/order-items")).send({
      id: id,
      "mealId": 5,
      "userId": 2,
      "quantity": 10,
      "status": "cart"
    }).then(function (res) {
      return res.body;
    }).then(function (order) {
      expect(order).to.be.an('object');
      expect(order).to.have.all.keys('mealId', 'userId', 'id', 'quantity', 'status');
    });
  });
});
describe('Delete order item', function () {
  it('Should return empty response', function () {
    _chai.default.request(_index.default).delete("".concat(apiVersion, "/order-items/").concat(id)).then(function (res) {
      expect(res.text).to.be.equal('');
    }).catch(function (err) {
      console.log(err.message);
    });
  });
});
//# sourceMappingURL=order-items.test.js.map
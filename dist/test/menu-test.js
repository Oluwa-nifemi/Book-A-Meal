"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _menu = _interopRequireDefault(require("../models/menu"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai.default.expect,
    use = _chai.default.use;
use(_chaiHttp.default);

var p = _path.default.join(__dirname, '../data', 'menu.json');

var apiVersion = '/api/v1';
describe('Get Menu', function () {
  it('Should return menu for the day', function () {
    _chai.default.request(_index.default).get("".concat(apiVersion, "/menu")).then(function (res) {
      return res.body;
    }).then(function (menu) {
      expect(menu).to.be.an('object');
      expect(menu).to.have.all.keys('date', 'meals');
    }).catch(function (err) {
      console.log(err.message);
    });
  });
});
describe('Add to Menu', function () {
  it('Should return meal', function () {
    _chai.default.request(_index.default).post("".concat(apiVersion, "/menu")).send({
      "id": 5,
      "quantity": 7
    }).then(function (res) {
      return res.body;
    }).then(function (meal) {
      expect(meal).to.be.an('object');
      expect(meal).to.have.all.keys('id', 'quantity');
    }).catch(function (err) {
      console.log(err.message);
    });
  });
});
describe('Edit menu', function () {
  it('Should return meal', function () {
    _chai.default.request(_index.default).put("".concat(apiVersion, "/menu")).send({
      "id": 3,
      "quantity": 1
    }).then(function (res) {
      return res.body;
    }).then(function (meal) {
      expect(meal).to.be.an('object');
      expect(meal).to.have.all.keys('id', 'quantity');
    }).catch(function (err) {
      console.log(err.message);
    });
  });
});
describe('Delete meal from menu', function () {
  it('Should return empty reply', function () {
    _chai.default.request(_index.default).delete("".concat(apiVersion, "/menu/5")).then(function (res) {
      expect(res.text).to.be.equal('');
    }).catch(function (err) {
      console.log(err.message);
    });
  });
});
//# sourceMappingURL=menu-test.js.map
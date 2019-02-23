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

var p = _path.default.join(__dirname, '../data', 'meals.json');

var apiVersion = '/api/v1';
describe('Get meals', function () {
  it('Should return meals array', function () {
    _chai.default.request(_index.default).get("".concat(apiVersion, "/meals")).then(function (data) {
      return JSON.parse(data.body);
    }).then(function (meals) {
      expect(meals).to.be.an('array');
      expect(meals[0]).to.have.all.keys('image', 'description', 'title', 'id', 'price', 'defaultQuantity');
    }).catch(function (err) {
      console.log(err);
    });
  });
});
describe('Add meal', function () {
  it('Should return meal', function () {
    _chai.default.request(_index.default).post("".concat(apiVersion, "/meals")).send({
      title: 'Test Meal',
      description: 'Juicy tasty cheesy cheeseburger',
      image: 'image1.jpg',
      price: 23.6,
      defaultQuantity: 100
    }).then(function (res) {
      return res.body;
    }).then(function (meal) {
      expect(meal).to.be.an('object');
      expect(meal).to.have.all.keys('image', 'description', 'title', 'id', 'price', 'defaultQuantity');
      var meals = JSON.parse(_fs.default.readFileSync(p, 'utf-8'));
      meals.pop();

      _fs.default.writeFileSync(p, JSON.stringify(meals));
    }).catch(function (err) {
      console.log(err.message);
    });
  });
});
describe('Edit meal', function () {
  it('Should return meal', function () {
    _chai.default.request(_index.default).put("".concat(apiVersion, "/meals/15")).send({
      title: 'Sparghetti',
      description: 'Juicy tasty cheesy cheeseburger',
      image: 'image1.jpg',
      price: 23.6,
      defaultQuantity: 100
    }).then(function (res) {
      return res.body;
    }).then(function (meal) {
      expect(meal).to.be.an('object');
      expect(meal).to.have.all.keys('image', 'description', 'title', 'id', 'price', 'defaultQuantity');
    }).catch(function (err) {
      console.log(err.message);
    });
  });
});
describe('Delete meal', function () {
  it('Should return nothing and status code 204', function () {
    _chai.default.request(_index.default).delete("".concat(apiVersion, "/meals/4")).then(function (res) {
      expect(res.text).to.be.equal('');
    }).catch(function (err) {
      console.log(err.message);
    });
  });
});
//# sourceMappingURL=meals.test.js.map
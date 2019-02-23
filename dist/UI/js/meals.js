"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Meal =
/*#__PURE__*/
function () {
  function Meal(meal) {
    _classCallCheck(this, Meal);

    var image = meal.image,
        title = meal.title,
        description = meal.description,
        price = meal.price,
        id = meal.id;
    Object.assign(this, {
      image: image,
      title: title,
      description: description,
      price: price,
      id: id
    });
  }

  _createClass(Meal, [{
    key: "getMealDiv",
    value: function getMealDiv() {
      var _this = this;

      var meal = document.createElement('div');
      meal.classList.add('meal');
      var image = document.createElement('img');
      image.src = "../images/".concat(this.image);
      var mealDetails = document.createElement('div');
      mealDetails.classList.add('meal-details');
      var mealTitle = document.createElement('p');
      mealTitle.innerText = this.title;
      mealTitle.classList.add('meal-title');
      var mealClass = this;
      mealTitle.addEventListener('click', function () {
        _this.showModal(mealClass);
      });
      var mealDescription = document.createElement('p');
      mealDescription.innerText = this.description;
      mealDescription.classList.add('meal-description');
      mealDetails.appendChild(mealTitle);
      mealDetails.appendChild(mealDescription);
      meal.appendChild(image);
      meal.appendChild(mealDetails);
      return meal;
    }
  }, {
    key: "showModal",
    value: function showModal(meal) {
      document.querySelector('#price').value = meal.price;
      document.querySelector('#title').value = meal.title;
      document.querySelector('#description').value = meal.description;
      modalContainer.classList.add('active');
      setTimeout(function () {
        document.querySelector('.modal-content').classList.add('active');
      }, 50);
    }
  }]);

  return Meal;
}();

var mealsArray = [{
  image: 'meal1.jpg',
  title: 'Cottage Pie',
  description: 'Our own minced beef, slow-cooked with red wine, thyme, celery and carrots, covered with buttery mash and topped with a mustard seed crumb.',
  price: 24.50,
  id: 1
}, {
  image: 'meal2.jpg',
  title: 'Beef Bourginon',
  description: 'Slow-cooked top rump steak, smoked bacon, mushrooms and caramelised baby onions with plenty of Merlot wine.',
  price: 34.50,
  id: 2
}, {
  image: 'meal3.jpg',
  title: 'Lasange Al Forno',
  description: 'A slow-cooked ragu of beef and pork layered between sheets of free range egg pasta, with béchamel sauce and a West Country Cheddar topping.',
  price: 14.50,
  id: 3
}, {
  image: 'meal4.jpg',
  title: 'Pulled Beef Chilli',
  description: 'Slow-cooked beef in a smoky tomato and chilli sauce with black beans, roasted red pepper strips, coriander and a squeeze of lime.',
  price: 40.00,
  id: 4
}];
var meals = [];
var modalContainer = document.querySelector('.modal-container');

var hideModal = function hideModal() {
  document.querySelector('.modal-content').classList.remove('active');
  setTimeout(function () {
    modalContainer.classList.remove('active');
  }, 450);
};

mealsArray.forEach(function (elem) {
  meals.push(new Meal(elem));
  var meal = new Meal(elem);
  document.querySelector('.meals').appendChild(meal.getMealDiv());
  var split = document.createElement('div');
  split.classList.add('split');
  document.querySelector('.meals').appendChild(split);
});
document.querySelector('.add-meal').addEventListener('click', function () {
  modalContainer.classList.add('active');
  setTimeout(function () {
    document.querySelector('.modal-content').classList.add('active');
  }, 50);
});
modalContainer.addEventListener('click', function (e) {
  if (e.path[0] === modalContainer) {
    hideModal();
  }
});
document.querySelector('.hide-modal').addEventListener('click', hideModal);
//# sourceMappingURL=meals.js.map
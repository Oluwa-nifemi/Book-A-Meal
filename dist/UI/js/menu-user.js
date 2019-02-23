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
      var meal = document.createElement('div');
      meal.classList.add('meal');
      var image = document.createElement('img');
      image.src = "images/".concat(this.image);
      var mealDetails = document.createElement('div');
      mealDetails.classList.add('meal-details');
      var mealTitle = document.createElement('p');
      mealTitle.classList.add('meal-title');
      mealTitle.innerText = this.title;
      var mealDescription = document.createElement('p');
      mealDescription.classList.add('meal-description');
      mealDescription.innerText = this.description;
      mealDetails.appendChild(mealTitle);
      mealDetails.appendChild(mealDescription);
      var orderDetails = document.createElement('div');
      orderDetails.classList.add('order-details');
      var split = document.createElement('div');
      split.classList.add('split');
      orderDetails.appendChild(split);
      var mealPrice = document.createElement('span');
      mealPrice.classList.add('meal-price');
      mealPrice.innerText = this.price;
      var orderMealBtn = document.createElement('button');
      orderMealBtn.classList.add('order-meal');
      orderMealBtn.innerText = 'Order';
      orderDetails.appendChild(mealPrice);
      orderDetails.appendChild(orderMealBtn);
      orderDetails.appendChild(split.cloneNode());
      var mealId = this.id;
      orderMealBtn.addEventListener('click', function () {
        modalContainer.classList.add('active');
        setTimeout(function () {
          document.querySelector('.modal-content').classList.add('active');
        }, 50);
        document.querySelector('#meal-id').value = mealId;
        document.querySelector('.modal-header').innerText = mealTitle.innerText;
      });
      meal.appendChild(image);
      meal.appendChild(mealDetails);
      meal.appendChild(orderDetails);
      return meal;
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
}, {
  image: 'meal5.jpg',
  title: 'Indomie',
  description: 'Noodles garnished with fish, meat, egg and other supplements',
  price: 40.00,
  id: 5
}, {
  image: 'meal1.jpg',
  title: 'Lasange Al Forno',
  description: 'A slow-cooked ragu of beef and pork layered between sheets of free range egg pasta, with béchamel sauce and a West Country Cheddar topping.',
  price: 14.50,
  id: 6
}, {
  image: 'meal2.jpg',
  title: 'Pulled Beef Chilli',
  description: 'Slow-cooked beef in a smoky tomato and chilli sauce with black beans, roasted red pepper strips, coriander and a squeeze of lime.',
  price: 40.00,
  id: 7
}, {
  image: 'meal3.jpg',
  title: 'Indomie',
  description: 'Noodles garnished with fish, meat, egg and other supplements',
  price: 40.00,
  id: 8
}, {
  image: 'meal4.jpg',
  title: 'Indomie',
  description: 'Noodles garnished with fish, meat, egg and other supplements',
  price: 40.00,
  id: 9
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
  image: 'meal1.jpg',
  title: 'Cottage Pie',
  description: 'Our own minced beef, slow-cooked with red wine, thyme, celery and carrots, covered with buttery mash and topped with a mustard seed crumb.',
  price: 24.50,
  id: 1
}];
var meals = [];
var modalContainer = document.querySelector('.modal-container');
mealsArray.forEach(function (elem) {
  meals.push(new Meal(elem));
  var meal = new Meal(elem);
  document.querySelector('.meals').appendChild(meal.getMealDiv());
});

var hideModal = function hideModal() {
  document.querySelector('.modal-content').classList.remove('active');
  setTimeout(function () {
    modalContainer.classList.remove('active');
  }, 450);
};

modalContainer.addEventListener('click', function (e) {
  if (e.path[0] === modalContainer) {
    hideModal();
  }
});
document.querySelector('.hide-modal').addEventListener('click', hideModal);
//# sourceMappingURL=menu-user.js.map
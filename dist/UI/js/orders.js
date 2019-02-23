"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Order =
/*#__PURE__*/
function () {
  function Order(_ref) {
    var image = _ref.image,
        title = _ref.title,
        description = _ref.description,
        price = _ref.price,
        id = _ref.id,
        quantity = _ref.quantity;

    _classCallCheck(this, Order);

    Object.assign(this, {
      image: image,
      title: title,
      description: description,
      price: price,
      id: id,
      quantity: quantity
    });
  }

  _createClass(Order, [{
    key: "getMealDiv",
    value: function getMealDiv() {
      var _this = this;

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
      var split = document.createElement('div');
      split.classList.add('split');
      var orderDetails = document.createElement('div');
      orderDetails.classList.add('order-details');
      var mealPrice = document.createElement('span');
      mealPrice.classList.add('meal-price');
      mealPrice.innerText = this.price;
      var removeBtn = document.createElement('button');
      removeBtn.innerHTML = '<img src="images/svg/minus.svg">';
      var mealQuantity = document.createElement('span');
      mealQuantity.classList.add('meal-qauntity');
      mealQuantity.innerHTML = this.quantity;
      var addBtn = document.createElement('button');
      addBtn.innerHTML = '<img src="images/svg/add.svg">';
      addBtn.addEventListener('click', function () {
        _this.quantity++; //Make fetch request to increase quantity

        mealQuantity.innerHTML = _this.quantity;
      });
      removeBtn.addEventListener('click', function () {
        _this.quantity--; //Make fetch request to reduce quantity

        mealQuantity.innerHTML = _this.quantity;
      });
      orderDetails.appendChild(mealPrice);
      orderDetails.appendChild(removeBtn);
      orderDetails.appendChild(mealQuantity);
      orderDetails.appendChild(addBtn);
      meal.appendChild(image);
      meal.appendChild(mealDetails);
      meal.appendChild(split);
      meal.appendChild(orderDetails);
      meal.appendChild(split.cloneNode());
      return meal;
    }
  }]);

  return Order;
}();

var mealsArray = [{
  image: 'meal1.jpg',
  title: 'Cottage Pie',
  description: 'Our own minced beef, slow-cooked with red wine, thyme, celery and carrots, covered with buttery mash and topped with a mustard seed crumb.',
  price: 24.50,
  id: 1,
  quantity: 5
}, {
  image: 'meal2.jpg',
  title: 'Beef Bourginon',
  description: 'Slow-cooked top rump steak, smoked bacon, mushrooms and caramelised baby onions with plenty of Merlot wine.',
  price: 34.50,
  id: 2,
  quantity: 4
}, {
  image: 'meal3.jpg',
  title: 'Lasange Al Forno',
  description: 'A slow-cooked ragu of beef and pork layered between sheets of free range egg pasta, with béchamel sauce and a West Country Cheddar topping.',
  price: 14.50,
  id: 3,
  quantity: 1
}, {
  image: 'meal4.jpg',
  title: 'Pulled Beef Chilli',
  description: 'Slow-cooked beef in a smoky tomato and chilli sauce with black beans, roasted red pepper strips, coriander and a squeeze of lime.',
  price: 40.00,
  id: 4,
  quantity: 3
}, {
  image: 'meal5.jpg',
  title: 'Indomie',
  description: 'Noodles garnished with fish, meat, egg and other supplements',
  price: 40.00,
  id: 5,
  quantity: 10
}, {
  image: 'meal1.jpg',
  title: 'Lasange Al Forno',
  description: 'A slow-cooked ragu of beef and pork layered between sheets of free range egg pasta, with béchamel sauce and a West Country Cheddar topping.',
  price: 14.50,
  id: 6,
  quantity: 3
}];
var modalContainer = document.querySelector('.modal-container');
mealsArray.forEach(function (elem) {
  var order = new Order(elem);
  document.querySelector('.meals').appendChild(order.getMealDiv());
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
document.querySelector('.checkout').addEventListener('click', function () {
  modalContainer.classList.add('active');
  setTimeout(function () {
    document.querySelector('.modal-content').classList.add('active');
  }, 50);
});
//# sourceMappingURL=orders.js.map
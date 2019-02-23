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
      image.src = "images/".concat(this.image);
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
  }]);

  return Meal;
}();

var modalContainer = document.querySelector('.modal-container');

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
document.querySelector('.add-meal').addEventListener('click', function () {
  modalContainer.classList.add('active');
  setTimeout(function () {
    document.querySelector('.modal-content').classList.add('active');
  }, 50);
});
document.querySelectorAll('.edit-quantity').forEach(function (e) {
  e.addEventListener('click', function () {
    e.parentElement.children[0].disabled = false;
    e.parentElement.children[2].classList.add('active');
    e.classList.remove('active');
  });
});
document.querySelectorAll('.save-quantity').forEach(function (e) {
  e.addEventListener('click', function () {
    e.parentElement.children[0].disabled = true; //Send fetch request to edit quantity

    e.parentElement.children[1].classList.add('active');
    e.classList.remove('active');
  });
});
//# sourceMappingURL=menu.js.map
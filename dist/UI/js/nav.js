"use strict";

var navToggle = document.querySelector('.nav-toggle');
navToggle.addEventListener('click', function () {
  var nav = document.querySelector('.nav');

  if (nav.classList.contains('active')) {
    nav.classList.remove('active');
    navToggle.classList.remove('active');
  } else {
    nav.classList.add('active');
    navToggle.classList.add('active');
  }
});
//# sourceMappingURL=nav.js.map
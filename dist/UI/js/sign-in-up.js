"use strict";

document.querySelectorAll('.tabs-button').forEach(function (e) {
  console.log(e);
  e.addEventListener('click', function () {
    document.querySelector('.tabs-button.active').classList.remove('active');
    e.classList.add('active');
    document.querySelector('.tab.active').classList.remove('active');
    var target = e.dataset.target;
    document.querySelector(".".concat(target)).classList.add('active');

    if (target === 'login') {
      document.querySelector('.indicator.right').classList.remove('right');
    } else {
      document.querySelector('.indicator').classList.add('right');
    }
  });
});
//# sourceMappingURL=sign-in-up.js.map
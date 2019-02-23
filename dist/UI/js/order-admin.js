"use strict";

document.querySelectorAll('input[type = "checkbox"]').forEach(function (e) {
  e.addEventListener('input', function () {
    var orderDiv = e.parentElement.parentElement.parentElement;
    orderDiv.style.opacity = '0';
    setTimeout(function () {
      orderDiv.remove();
    }, 500);
  });
});
//# sourceMappingURL=order-admin.js.map
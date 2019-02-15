document.querySelectorAll('input[type = "checkbox"]').forEach(e => {
    e.addEventListener('input',() => {
        const orderDiv = e.parentElement.parentElement.parentElement;
        orderDiv.style.opacity = '0';
        setTimeout(() => {
            orderDiv.remove();
        },500)
    })
})
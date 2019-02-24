class Meal {
    constructor(meal){
        const {image,title,description,price,id} = meal;
        Object.assign(this,{image,title,description,price,id})
    }
    getMealDiv(){
        const meal = document.createElement('div');
        meal.classList.add('meal')
        const image = document.createElement('img');
        image.src = `images/${this.image}`;
        const mealDetails  = document.createElement('div');
        mealDetails.classList.add('meal-details');
        const mealTitle = document.createElement('p');
        mealTitle.innerText = this.title;
        mealTitle.classList.add('meal-title');
        const mealClass = this;
        mealTitle.addEventListener('click',() => {
            this.showModal(mealClass);
        });
        const mealDescription = document.createElement('p');
        mealDescription.innerText = this.description;
        mealDescription.classList.add('meal-description')
        mealDetails.appendChild(mealTitle);
        mealDetails.appendChild(mealDescription);
        meal.appendChild(image);
        meal.appendChild(mealDetails);
        return meal;
    }
}

document.querySelector('.add-meal').addEventListener('click',() => {
    modalContainer.classList.add('active');
    setTimeout(() => {
        document.querySelector('.modal-content').classList.add('active');
    },50)
})

document.querySelectorAll('.edit-quantity').forEach((e) => {
    e.addEventListener('click',() => {
        e.parentElement.children[0].disabled = false;
        e.parentElement.children[2].classList.add('active');
        e.classList.remove('active');
    })
})

document.querySelectorAll('.save-quantity').forEach((e) => {
    e.addEventListener('click',() => {
        e.parentElement.children[0].disabled = true;
        //Send fetch request to edit quantity
        e.parentElement.children[1].classList.add('active');
        e.classList.remove('active');
    })
})
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

const modalContainer = document.querySelector('.modal-container');
const hideModal = () => {
    document.querySelector('.modal-content').classList.remove('active');        
    setTimeout(() => {
        modalContainer.classList.remove('active');
    },450)
}

modalContainer.addEventListener('click',(e) => {
    if(e.path[0] === modalContainer){
        hideModal();
    }
})

document.querySelector('.hide-modal').addEventListener('click',hideModal);
 
document.querySelector('.add-meal').addEventListener('click',() => {
    modalContainer.classList.add('active');
    setTimeout(() => {
        document.querySelector('.modal-content').classList.add('active');
    },50)
})
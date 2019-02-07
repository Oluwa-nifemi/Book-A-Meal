class Meal {
    constructor(meal){
        const {image,title,description,price,id} = meal;
        Object.assign(this,{image,title,description,price})
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
    showModal(meal){
        document.querySelector('#price').value = meal.price;
        document.querySelector('#title').value = meal.title;
        document.querySelector('#description').value = meal.description;
        modalContainer.classList.add('active');
        setTimeout(() => {
            document.querySelector('.modal-content').classList.add('active');
        },50)    
    }
}
const mealsArray = [
    {
        image : 'meal1.jpg',
        title : 'Cottage Pie',
        description : 'Our own minced beef, slow-cooked with red wine, thyme, celery and carrots, covered with buttery mash and topped with a mustard seed crumb.',
        price : 24.50,
        id : 1
    },
    {
        image : 'meal2.jpg',
        title : 'Beef Bourginon',
        description : 'Slow-cooked top rump steak, smoked bacon, mushrooms and caramelised baby onions with plenty of Merlot wine.',
        price : 34.50,
        id : 2
    },
    {
        image : 'meal3.jpg',
        title : 'Lasange Al Forno',
        description : 'A slow-cooked ragu of beef and pork layered between sheets of free range egg pasta, with béchamel sauce and a West Country Cheddar topping.',
        price : 14.50,
        id : 3
    },
    {
        image : 'meal4.jpg',
        title : 'Pulled Beef Chilli',
        description : 'Slow-cooked beef in a smoky tomato and chilli sauce with black beans, roasted red pepper strips, coriander and a squeeze of lime.',
        price : 40.00,
        id : 4
    }
]
const meals =  [];
const modalContainer = document.querySelector('.modal-container');
const hideModal = () => {
    document.querySelector('.modal-content').classList.remove('active');        
    setTimeout(() => {
        modalContainer.classList.remove('active');
    },450)
}
mealsArray.forEach(elem => {
    meals.push(new Meal(elem));
    const meal = new Meal(elem);
    document.querySelector('.meals').appendChild(meal.getMealDiv())
    const split = document.createElement('div');
    split.classList.add('split');
    document.querySelector('.meals').appendChild(split);
})

document.querySelector('.add-meal').addEventListener('click',() => {
    modalContainer.classList.add('active');
    setTimeout(() => {
        document.querySelector('.modal-content').classList.add('active');
    },50)
})

modalContainer.addEventListener('click',(e) => {
    if(e.path[0] === modalContainer){
        hideModal();
    }
})

document.querySelector('.hide-modal').addEventListener('click',hideModal);



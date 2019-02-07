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
        mealTitle.classList.add('meal-title');
        mealTitle.innerText = this.title;
        const mealDescription = document.createElement('p');
        mealDescription.classList.add('meal-description')
        mealDescription.innerText = this.description;
        mealDetails.appendChild(mealTitle);
        mealDetails.appendChild(mealDescription);
        const orderDetails = document.createElement('div');
        orderDetails.classList.add('order-details');
        const split = document.createElement('div');
        split.classList.add('split');
        orderDetails.appendChild(split);
        const mealPrice = document.createElement('span');
        mealPrice.classList.add('meal-price')
        mealPrice.innerText = this.price;
        const orderMealBtn = document.createElement('button');
        orderMealBtn.classList.add('order-meal');
        orderMealBtn.innerText = 'Order'; 
        orderDetails.appendChild(mealPrice);
        orderDetails.appendChild(orderMealBtn);
        orderDetails.appendChild(split.cloneNode());
        const mealId = this.id;
        orderMealBtn.addEventListener('click',() => {
            modalContainer.classList.add('active');
            setTimeout(() => {
                document.querySelector('.modal-content').classList.add('active');
            },50)
            document.querySelector('#meal-id').value = mealId;
            document.querySelector('.modal-header').innerText = mealTitle.innerText;
        })
        meal.appendChild(image);
        meal.appendChild(mealDetails);
        meal.appendChild(orderDetails);
        return meal;
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
    },
    {
        image : 'meal5.jpg',
        title : 'Indomie',
        description : 'Noodles garnished with fish, meat, egg and other supplements',
        price : 40.00,
        id : 5
    },
    {
        image : 'meal1.jpg',
        title : 'Lasange Al Forno',
        description : 'A slow-cooked ragu of beef and pork layered between sheets of free range egg pasta, with béchamel sauce and a West Country Cheddar topping.',
        price : 14.50,
        id : 6
    },
    {
        image : 'meal2.jpg',
        title : 'Pulled Beef Chilli',
        description : 'Slow-cooked beef in a smoky tomato and chilli sauce with black beans, roasted red pepper strips, coriander and a squeeze of lime.',
        price : 40.00,
        id : 7
    },
    {
        image : 'meal3.jpg',
        title : 'Indomie',
        description : 'Noodles garnished with fish, meat, egg and other supplements',
        price : 40.00,
        id : 8
    },
    {
        image : 'meal4.jpg',
        title : 'Indomie',
        description : 'Noodles garnished with fish, meat, egg and other supplements',
        price : 40.00,
        id : 9
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
        image : 'meal1.jpg',
        title : 'Cottage Pie',
        description : 'Our own minced beef, slow-cooked with red wine, thyme, celery and carrots, covered with buttery mash and topped with a mustard seed crumb.',
        price : 24.50,
        id : 1
    }
]
const meals =  [];
const modalContainer = document.querySelector('.modal-container');
mealsArray.forEach(elem => {
    meals.push(new Meal(elem));
    const meal = new Meal(elem);
    document.querySelector('.meals').appendChild(meal.getMealDiv())
})

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

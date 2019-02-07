class Meal {
    constructor(meal){
        const {image,title,description,price} = meal;
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
const mealsArray = [
    {
        image : 'meal1.jpg',
        title : 'Cottage Pie',
        description : 'Our own minced beef, slow-cooked with red wine, thyme, celery and carrots, covered with buttery mash and topped with a mustard seed crumb.',
        price : 24.50
    },
    {
        image : 'meal2.jpg',
        title : 'Beef Bourginon',
        description : 'Slow-cooked top rump steak, smoked bacon, mushrooms and caramelised baby onions with plenty of Merlot wine.',
        price : 34.50
    },
    {
        image : 'meal3.jpg',
        title : 'Lasange Al Forno',
        description : 'A slow-cooked ragu of beef and pork layered between sheets of free range egg pasta, with béchamel sauce and a West Country Cheddar topping.',
        price : 14.50
    },
    {
        image : 'meal4.jpg',
        title : 'Pulled Beef Chilli',
        description : 'Slow-cooked beef in a smoky tomato and chilli sauce with black beans, roasted red pepper strips, coriander and a squeeze of lime.',
        price : 40.00
    }
]
const meals =  [];
mealsArray.forEach(elem => {
    meals.push(new Meal(elem));
    const meal = new Meal(elem);
    document.querySelector('.meals').appendChild(meal.getMealDiv())
    document.querySelector('.meals').innerHTML += "<div class = 'split'></div>"
})
console.log(meals)



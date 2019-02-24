class Order {
    constructor({image,title,description,price,id,quantity} ){
        Object.assign(this,{image,title,description,price,id,quantity})
    }
    getOrderDetails(){
        const orderDetails = document.createElement('div');
        orderDetails.classList.add('order-details');
        const mealPrice = document.createElement('span');
        mealPrice.classList.add('meal-price')
        mealPrice.innerText = this.price;
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '<img src="images/svg/minus.svg">'
        const mealQuantity = document.createElement('span');
        mealQuantity.classList.add('meal-qauntity');
        mealQuantity.innerHTML = this.quantity;
        const addBtn = document.createElement('button');
        addBtn.innerHTML = '<img src="images/svg/add.svg">'
        addBtn.addEventListener('click',() => {
            this.quantity++;
            //Make fetch request to increase quantity
            mealQuantity.innerHTML = this.quantity;
        })
        removeBtn.addEventListener('click',() => {
            this.quantity--;
            //Make fetch request to reduce quantity
            mealQuantity.innerHTML = this.quantity;
        })
        orderDetails.appendChild(mealPrice);
        orderDetails.appendChild(removeBtn);
        orderDetails.appendChild(mealQuantity);
        orderDetails.appendChild(addBtn);
        return orderDetails;
    }
    getMealDetails(){
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
        return mealDetails;
    }
    getMealDiv(){
        const meal = document.createElement('div');
        meal.classList.add('meal')
        const image = document.createElement('img');
        image.src = `images/${this.image}`;
        const split = document.createElement('div');
        split.classList.add('split');
        meal.appendChild(image);
        meal.appendChild(this.getMealDetails());
        meal.appendChild(split);
        meal.appendChild(this.getOrderDetails());
        meal.appendChild(split.cloneNode());
        return meal;
    }
}
const mealsArray = [
    {
        image : 'meal1.jpg',
        title : 'Cottage Pie',
        description : 'Our own minced beef, slow-cooked with red wine, thyme, celery and carrots, covered with buttery mash and topped with a mustard seed crumb.',
        price : 24.50,
        id : 1,
        quantity : 5
    },
    {
        image : 'meal2.jpg',
        title : 'Beef Bourginon',
        description : 'Slow-cooked top rump steak, smoked bacon, mushrooms and caramelised baby onions with plenty of Merlot wine.',
        price : 34.50,
        id : 2,
        quantity : 4
    },
    {
        image : 'meal3.jpg',
        title : 'Lasange Al Forno',
        description : 'A slow-cooked ragu of beef and pork layered between sheets of free range egg pasta, with béchamel sauce and a West Country Cheddar topping.',
        price : 14.50,
        id : 3,
        quantity : 1
    },
    {
        image : 'meal4.jpg',
        title : 'Pulled Beef Chilli',
        description : 'Slow-cooked beef in a smoky tomato and chilli sauce with black beans, roasted red pepper strips, coriander and a squeeze of lime.',
        price : 40.00,
        id : 4,
        quantity : 3
    },
    {
        image : 'meal5.jpg',
        title : 'Indomie',
        description : 'Noodles garnished with fish, meat, egg and other supplements',
        price : 40.00,
        id : 5,
        quantity : 10
    },
    {
        image : 'meal1.jpg',
        title : 'Lasange Al Forno',
        description : 'A slow-cooked ragu of beef and pork layered between sheets of free range egg pasta, with béchamel sauce and a West Country Cheddar topping.',
        price : 14.50,
        id : 6,
        quantity : 3
    },
]
mealsArray.forEach(elem => {
    const order = new Order(elem);
    document.querySelector('.meals').appendChild(order.getMealDiv())
})

document.querySelector('.checkout').addEventListener('click',() => {
    modalContainer.classList.add('active');
    setTimeout(() => {
        document.querySelector('.modal-content').classList.add('active');        
    },50)
})
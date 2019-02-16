// import fs from 'fs';
const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'meals.json');

class Meal {
    constructor({
        title,
        description,
        image,
        price,
        defaultQuantity,
    }) {
        Object.assign(this, {
            title, description, image, price, defaultQuantity,
        });
    }

    static fetchMeals() {
        return fs.readFileSync(p);
    }

    add() {
        try {
            const meals = JSON.parse(this.constructor.fetchMeals());
            const meal = {
                id: meals.length + 1,
                ...this,
            };
            meals.push(meal);
            fs.writeFileSync(p, JSON.stringify(meals));
            return meal;
        } catch (err) {
            return err;
        }
    }
}

// export default Meal;

module.exports = Meal;

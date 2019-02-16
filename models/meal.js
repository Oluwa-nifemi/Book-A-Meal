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

    update(id) {
        try {
            const meals = JSON.parse(this.constructor.fetchMeals());
            const meal = {
                id,
                ...this,
            };
            const index = meals.findIndex(m => id === m.id);
            if (index !== -1) {
                meals[index] = meal;
                fs.writeFileSync(p, JSON.stringify(meals));
                return meals[index];
            } else {
                throw new Error('Meal not found');
            }
        } catch (err) {
            return { err: err.message };
        }
    }
}

// export default Meal;

module.exports = Meal;

import fs from 'fs';
import path from 'path';

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
            } else {
                throw new Error('Meal not found');
            }
            return meals[index];
        } catch (err) {
            return { err: err.message };
        }
    }

    static delete(id) {
        const meals = JSON.parse(this.fetchMeals());
        const index = meals.findIndex(m => m.id === id);
        let meal = {};
        if (index !== -1) {
            [meal] = meals.splice(index, 1);
        }
        fs.writeFileSync(p, JSON.stringify(meals));
        return meal;
    }
}

export default Meal;

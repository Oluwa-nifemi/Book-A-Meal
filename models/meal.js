import fs from 'fs';
import path from 'path';

const p = path.join(__dirname, '../data', 'meals.json');

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
        return fs.readFileSync(p, 'utf-8');
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
            }
            return {};
        } catch (err) {
            return { err: err.message };
        }
    }

    static delete(id) {
        let meals = JSON.parse(this.fetchMeals());
        meals = meals.filter(meal => meal.id !== id);
        fs.writeFileSync(p, JSON.stringify(meals));
    }
}

export default Meal;

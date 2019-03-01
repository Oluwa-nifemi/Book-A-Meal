import fs from 'fs';
import path from 'path';
import MealModel from '../models/Meal';

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
        return MealModel.findAll()
            .then((meals) => {
                return meals.map(meal => meal.dataValues);
            });
    }

    static fetchMealById(id) {
        const meals = this.fetchMeals();
        return meals.find(m => m.id === id);
    }

    async add() {
        return MealModel.create(this);
    }

    update(id) {
        try {
            const meals = this.constructor.fetchMeals();
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
        let meals = this.fetchMeals();
        meals = meals.filter(meal => meal.id !== id);
        fs.writeFileSync(p, JSON.stringify(meals));
    }
}

export default Meal;

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
            .then(meals => meals.map(meal => meal.dataValues));
    }

    static fetchMealById(id) {
        const meals = this.fetchMeals();
        return meals.find(m => m.id === id);
    }

    add() {
        return MealModel.create(this);
    }

    static update(meal, id) {
        return MealModel.update(meal, { where: { id }, returning: true })
            .then(res => res.pop())
            .then(modded => modded.pop())
            .then(m => m.dataValues);
    }

    static delete(id) {
        return MealModel.destroy({ where: { id } });
    }
}

export default Meal;

import MealModel from '../models/Meal';

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

    static async fetchMeals(req, res) {
        const meals = await MealModel.findAll();
        const mealsDetails = meals.map(meal => meal.dataValues);
        res.status(200).json({
            status: 'success',
            data: mealsDetails,
        });
    }

    static async add(req, res) {
        const meal = await MealModel.create(req.body);
        const mealDetails = meal.dataValues;
        res.status(200).json({
            status: 'success',
            data: mealDetails,
        });
    }

    static async update(req, res) {
        const updated = await MealModel.update(req.body,
            { where: { id: req.params.id }, returning: true });
        const updatedMeal = updated[1][0];
        res.status(200).json({
            status: 'success',
            data: updatedMeal,
        });
    }

    static async delete(req, res) {
        const id = parseInt(req.params.id, 10);
        try {
            await MealModel.destroy({ where: { id } });
            res.status(204).send();
        } catch (err) {
            res.json({ err: err.message });
        }
    }
}

export default Meal;

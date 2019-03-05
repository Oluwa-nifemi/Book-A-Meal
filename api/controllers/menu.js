import MenuModel from '../models/Menu';

class Menu {
    constructor({
        userId,
        date,
        orderItems,
        state,
    }) {
        Object.assign(this, {
            userId, date, orderItems, state,
        });
    }

    static async getMenu(req, res) {
        let menu = await MenuModel.findOne({ where: { date: new Date() } });
        if (!menu) {
            menu = await MenuModel.create();
        }
        res.status(200).send(menu.dataValues);
    }

    static async addMeal(req, res) {
        const menu = await MenuModel.findOne({ where: { date: new Date() } });
        const { meals } = menu;
        const meal = req.body;
        if (!meals.find(m => m.id === meal.id)) {
            meals.push(meal);
            await MenuModel.update({ meals }, { where: { date: new Date() } });
            res.send('The meal was added to the database');
            return true;
        }
        res.status(409).send('Meal already in menu');
    }

    static async editMeal(req, res) {
        const meal = req.body;
        const menu = await MenuModel.findOne({ where: { date: new Date() } });
        const { meals } = menu;
        const mealIndex = meals.findIndex(m => m.id === meal.id);
        if (mealIndex > -1) {
            meals.splice(mealIndex, 1, meal);
            await MenuModel.update({ meals }, { where: { date: new Date() } });
            res.status(200).send('The meal was succesfully edited');
            return true;
        }
        res.status(409).send('Meal is not on the menu');
    }

    static async deleteMeal(req, res) {
        const menu = await MenuModel.findOne({ where: { date: new Date() } });
        const id = parseInt(req.params.id, 10);
        const { meals } = menu;
        const mealIndex = meals.findIndex(m => m.id === id);
        if (mealIndex > -1) {
            meals.splice(mealIndex, 1);
            MenuModel.update({ meals }, { where: { date: new Date() } });
            res.status(204).send();
            return true;
        }
        res.status(409);
    }
}


export default Menu;

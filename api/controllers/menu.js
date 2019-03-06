import MenuModel from '../models/Menu';

class Menu {
    static async getMenu(req, res) {
        let menu = await MenuModel.findOne({ where: { date: new Date() } });
        if (!menu) {
            menu = await MenuModel.create();
        }
        const data = menu.dataValues;
        res.status(200).json({
            status: 'success',
            data,
        });
        return true;
    }

    static async addMeal(req, res) {
        const menu = await MenuModel.findOne({ where: { date: new Date() } });
        const { meals } = menu;
        const meal = req.body;
        if (!meals.find(m => m.id === meal.id)) {
            meals.push(meal);
            await MenuModel.update({ meals }, { where: { date: new Date() } });
            res.json({
                status: 'success',
                message: 'The meal was added to the database',
            });
            return true;
        }
        res.status(409).json({
            status: 'failure',
            message: 'Meal already in menu',
        });
        return false;
    }

    static async editMeal(req, res) {
        const meal = req.body;
        const menu = await MenuModel.findOne({ where: { date: new Date() } });
        const { meals } = menu;
        const mealIndex = meals.findIndex(m => m.id === meal.id);
        if (mealIndex > -1) {
            meals.splice(mealIndex, 1, meal);
            await MenuModel.update({ meals }, { where: { date: new Date() } });
            res.status(200).json({
                status: 'success',
                message: 'The meal was successfully edited',
            });
            return true;
        }
        res.status(409).json({
            status: 'failure',
            message: 'Meal is not on the menu',
        });
        return false;
    }

    static async deleteMeal(req, res) {
        let menu = await MenuModel.findOne({ where: { date: new Date() } });
        menu = menu.dataValues;
        const id = parseInt(req.params.id, 10);
        const { meals } = menu;
        const mealIndex = meals.findIndex(m => m.mealId === id);
        if (mealIndex > -1) {
            meals.splice(mealIndex, 1);
            MenuModel.update({ meals }, { where: { date: new Date() } });
            res.status(204).send();
            return true;
        }
        res.status(409).send();
        return false;
    }
}


export default Menu;

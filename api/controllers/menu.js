import fs from 'fs';
import path from 'path';
import MenuModel from '../models/Menu';

const p = path.join(__dirname, '../data', 'menu.json');

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

    static getMenu() {
        return MenuModel.findOne({ where: { date: new Date() } })
            .then((menu) => {
                if (menu) {
                    return menu;
                }
                return MenuModel.create();
            })
            .then(m => m.dataValues);
    }

    static addMeal(meal) {
        return this.getMenu()
            .then((menu) => {
                const { meals } = menu;
                if (!meals.find(m => m.id === meal.id)) {
                    meals.push(meal);
                    MenuModel.update({ meals }, { where: { date: new Date() } });
                    return {
                        status: 'success',
                        code: 200,
                        message: 'The meal was added to the database',
                    };
                }
                return {
                    status: 'failure',
                    code: 409,
                    message: 'Meal already in menu',
                };
            });
    }

    static editMeal(meal) {
        return this.getMenu()
            .then((menu) => {
                const { meals } = menu;
                const mealIndex = meals.findIndex(m => m.id === meal.id);
                if (mealIndex > -1) {
                    meals.splice(mealIndex, 1, meal);
                    MenuModel.update({ meals }, { where: { date: new Date() } });
                    return {
                        status: 'success',
                        code: 200,
                        message: 'The meal was succesfully edited',
                    };
                }
                return {
                    status: 'failure',
                    code: 409,
                    message: 'Meal is not on the menu',
                };
            });
    }

    static deleteMeal(id) {
        const menu = this.getMenu();
        const menus = JSON.parse(fs.readFileSync(p));
        const index = menus.findIndex(m => m.date === menu.date);
        menu.meals = menu.meals.filter(meal => meal.id !== id);
        menus[index] = menu;
        fs.writeFileSync(p, JSON.stringify(menus));
    }
}

export default Menu;

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
        const menu = this.getMenu();
        const menus = JSON.parse(fs.readFileSync(p));
        const index = menus.findIndex(m => m.date === menu.date);
        if (!menu.meals.find(m => m.id === meal.id)) {
            menu.meals.push(meal);
            menus[index] = menu;
            fs.writeFileSync(p, JSON.stringify(menus));
            return meal;
        }
        return { err: 'Meal already in menu' };
    }

    static editMeal(meal) {
        const menu = this.getMenu();
        const menus = JSON.parse(fs.readFileSync(path.join(__dirname, '../data', 'menu.json')));
        const index = menus.findIndex(m => m.date === menu.date);
        const mealIndex = menu.meals.findIndex(m => m.id === meal.id);
        if (mealIndex !== -1) {
            menu.meals[mealIndex] = meal;
            menus[index] = menu;
            fs.writeFileSync(p, JSON.stringify(menus));
            return meal;
        }
        return { err: "Meal doesn't exist in menu" };
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

import fs from 'fs';
import path from 'path';

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
        try {
            const data = JSON.parse(fs.readFileSync(p));
            const today = new Date();
            const todayFormatted = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
            const menuToday = data.find(menu => `${menu.date}` === todayFormatted) || {};
            if (!Object.keys(menuToday).length) {
                menuToday.date = todayFormatted;
                menuToday.meals = [];
                data.push(menuToday);
                fs.writeFileSync(p, JSON.stringify(data));
            }
            return menuToday;
        } catch (err) {
            return { err: err.message };
        }
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
        const meals = JSON.parse(fs.readFileSync(p));
        const index = meals.findIndex(m => m.date === menu.date);
        menu.meals = menu.meals.filter(meal => meal.id !== id);
        meals[index] = menu;
        return meals;
    }
}

export default Menu;

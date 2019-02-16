import fs from 'fs';
import path from 'path';

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'menu.json');

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
        const meals = JSON.parse(fs.readFileSync(p));
        const index = meals.findIndex(m => m.date === menu.date);
        if (!menu.meals.find(m => m.id === meal.id)) {
            menu.meals.push(meal);
            meals[index] = menu;
            fs.writeFileSync(p, JSON.stringify(meals));
            return meal;
        }
        return { err: 'Meal already in menu' };
    }
}

export default Menu;

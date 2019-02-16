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
            const data = fs.readFileSync(p);
            const today = new Date();
            const todayFormatted = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
            const menuToday = JSON.parse(data).find(menu => `${menu.date}` === todayFormatted);
            return menuToday || {};
        } catch (err) {
            return { err: err.message };
        }
    }
}

export default Menu;

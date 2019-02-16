import fs from 'fs';

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

    static async getMenu() {
        return fs.readFile('../data/menu.json', 'utf8', (err, data) => {
            if (err) throw err;
            const today = new Date();
            const todayFormatted = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`;
            const menuToday = JSON.parse(data).find(menu => menu.date === todayFormatted);
            return menuToday || {};
        });
    }
}

export default Menu;

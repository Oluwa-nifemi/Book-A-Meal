import fs from 'fs';
import path from 'path';

const p = path.join(__dirname, '../data', 'orders.json');

class Order {
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

    static getOrders() {
        return fs.readFileSync(p, 'utf-8');
    }

    add() {
        const orders = JSON.parse(this.constructor.getOrders());
        const id = orders.length + 1;
        orders.push({ id, ...this });
        fs.writeFileSync(p, JSON.stringify(orders));
        return { id, ...this };
    }

    static getUserOrders(userId) {
        let orders = JSON.parse(this.getOrders());
        orders = orders.filter(order => order.userId === userId);
        return orders;
    }
}

export default Order;

import fs from 'fs';
import path from 'path';

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'orders.json');

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
        return fs.readFileSync(p);
    }

    add() {
        const orders = JSON.parse(this.constructor.getOrders());
        orders.push(this);
        fs.writeFileSync(p, JSON.stringify(orders));
        return this;
    }
}

export default Order;

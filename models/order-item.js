import fs from 'fs';
import path from 'path';

const p = path.join(path.dirname(process.mainModule.filename), 'data', 'order-items.json');

class OrderItem {
    constructor({
        mealId,
        userId,
        quantity,
        status,
    }) {
        Object.assign(this, {
            mealId, userId, quantity, status,
        });
    }

    static getOrderItems(id) {
        const orderItems = JSON.parse(fs.readFileSync(p));
        const orderItemsFiltered = orderItems.filter(item => item.userId === id && item.status === 'cart');
        return orderItemsFiltered;
    }

    add() {
        const orderItems = JSON.parse(fs.readFileSync(p));
        if (orderItems.find(item => item.mealId === this.mealId && item.userId === this.userId)) {
            return { err: 'Meal already exists you can increase the quantity in your cart' };
        }
        orderItems.push(this);
        fs.writeFileSync(p, JSON.stringify(orderItems));
        return this;
    }
}

export default OrderItem;
